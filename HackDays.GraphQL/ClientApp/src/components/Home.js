import React, { Component } from 'react';
import axios from 'axios'

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hero: { name: "" }, loading: true
        };
    }

    componentDidMount() {
        this.populateData();
    }

    render() {

        return (
            this.state.loading
                ? <p><em>Loading...</em></p> :
                <div>
                    <h1>Hero name is {this.state.hero.name} </h1>
                </div>
        );
    }

    async populateData() {
        const body = {
            query: `query {
              hero {
                name
              }
            }`,
            variables: {}
        }

        axios.post("https://localhost:44354/graphql", body)
            .then(res => {
                console.log(res.data)
                this.setState({ hero: res.data.data.hero, loading: false })
            })
    }
}
