import React, { Component } from "react";

import "./styles/favorites.css"

const Endpoint = 'https://next.json-generator.com/api/json/get/NkrAZ7frY';

export default class favorite extends Component {
    constructor(props) {
        super(props);

        this.state = {
            favoriteData: [],
            isLoading: false,
            error: null
        };
    }

    render() {
        const { favoriteData, isLoading, error } = this.state;

        if ( !favoriteData ){ return <p className="black-text"> No Favorites found...</p>;}
        if ( isLoading ){var fetching = <p className="black-text"> Loading Favorites Data...</p>;}
        if ( error ){ return <p className="red-text"> {error.message} </p>;}

        return (
            <div id="favorite">
                <h5 className="title">Favorite Feed</h5>
                <div className="favorite">
                    {fetching}
                     {favoriteData.map( (scholarship, index) =>
                     <div className="card-panel" key={index}>
                        <a href={scholarship.url}>
                            <div className="post">
                                <span className="title">{scholarship.title}</span>
                                <p className="price">{scholarship.amount}</p>
                            </div>
                            <div className="social"><span className="material-icons">favorite_border</span>{scholarship.views}</div>
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
                        let scholarship = { title: "", url: "", author:"", image:"", views:"" };
                        if(!item.favorite){ return }
                        scholarship.title = item.company;
                        scholarship.amount = item.amount;
                        scholarship.image = item.picture;
                        dataParsed.push(scholarship)
                    })
                } catch (error) {console.log(`Error inside the parsing function: ${error}`)}
            self.setState({ favoriteData: dataParsed, isLoading: false })

        }).catch( error => this.setState({ error, isLoading: false }))
    }
}
