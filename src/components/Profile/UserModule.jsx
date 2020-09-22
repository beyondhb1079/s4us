import React, { Component } from "react";

//CSS
import "./styles/users.css"

//API ENDPOINT: for user info
const Endpoint = 'https://next.json-generator.com/api/json/get/NkrAZ7frY';

export default class UserModule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: [],
            isLoading: false,
            error: null
        };
    }

    render() {
        const { userData, isLoading, error } = this.state;

        if ( !userData ){ return <p className="black-text"> No users found...</p>;}
        if ( isLoading ){var fetching = <p className="black-text"> Loading users Data...</p>;}
        if ( error ){ return <p className="red-text"> {error.message} </p>;}

        return (
            <div id="user">
                <h5 className="title">user Feed</h5>
                <div className="user">
                    {fetching}
                     {userData.map( (user, index) =>
                     <div className="card-panel" key={index}>
                        <a href={user.url}>
                            <div className="post">
                                <span className="title">{user.title}</span>
                                <p className="price">{user.amount}</p>
                            </div>
                            <div className="social"><span className="material-icons">user_border</span>{user.views}</div>
                        </a>
                     </div>)}
                </div>
            </div>
        );
    }

    componentDidMount = async () =>{
        this.setState({ isLoading: true })
        let self = this
        let dataParsed = [];
        fetch(Endpoint)
            .then(response => response.json())
            .then(function (data){
                try{
                    data.forEach( item => {
                        let user = { title: "", url: "", author:"", image:"", views:"" };
                        if(!item.user){ return }
                        user.title = item.company;
                        user.amount = item.amount;
                        user.image = item.picture;
                        dataParsed.push(user)
                    })
                } catch (error) {console.log(`Error inside the parsing function: ${error}`)}
            self.setState({ userData: dataParsed, isLoading: false })

        }).catch( error => this.setState({ error, isLoading: false }))
    }
}
