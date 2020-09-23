import React, { Component } from 'react';

import './styles/users.css';

const Endpoint = 'https://next.json-generator.com/api/json/get/NkrAZ7frY';

export default class UserModule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: [],
      isLoading: false,
      error: null,
    };
  }

   componentDidMount = async () => {
      this.setState({ isLoading: true });
      const self = this;
      const dataParsed = [];
      fetch(Endpoint)
        .then((response) => response.json())
        .then((data) => {
          try {
            data.forEach((item) => {
              const user = {
                title: '', url: '', author: '', image: '', views: '',
              };
              if (!item.user) { return; }
              user.title = item.company;
              user.amount = item.amount;
              user.image = item.picture;
              dataParsed.push(user);
            });
          } catch (error) { console.log(`Error inside the parsing function: ${error}`); }
          self.setState({ userData: dataParsed, isLoading: false });
        }).catch((error) => this.setState({ error, isLoading: false }));
    }

  render() {
    const { userData, isLoading, error } = this.state;

    if (!userData) { return <p className="black-text"> No users found...</p>; }
    if (isLoading) { var fetching = <p className="black-text"> Loading users Data...</p>; }
    if (error) {
      return (
        <p className="red-text">
          {' '}
          {error.message}
          {' '}
        </p>
      );
    }

    return (
      <div id="user">
        <h5 className="title">user Feed</h5>
        <div className="user">
          {fetching}
          {userData.map((user, index) => (
            <div className="card-panel" key={index}>
              <a href={user.url}>
                <div className="post">
                  <span className="title">{user.title}</span>
                  <p className="price">{user.amount}</p>
                </div>
                <div className="social">
                  <span className="material-icons">user_border</span>
                  {user.views}
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
