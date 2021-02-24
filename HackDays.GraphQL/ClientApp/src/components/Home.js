import React, { Component } from 'react';
import axios from 'axios'

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: true
        };
    }

    componentDidMount() {
        this.populateData();
    }

    render() {

        return (
            this.state.loading
                ? <p><em>Loading...</em></p> :
                this.state.products.map((product: any) =>
                    <div>
                        <h5>Product name: {product.name} </h5>
                        <h5>Description: {product.description} </h5>
                    </div>
                )
        );
    }

    async populateData() {
        const body = {
            query: `query {
              products {
                name,
                description
              }
            }`,
            variables: {}
        }

        axios.post("https://localhost:44354/graphql", body)
            .then(res => {
                console.log(res.data)
                this.setState({ products: res.data.data.products, loading: false })
            })
    }
}
