import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
                <div className="row">
                    {
                        this.state.products.map((product: any) =>
                            <div className="col-md-4">
                                <div className="product-item">
                                    <Link to="/mens" className="text-decoration-none text-reset">
                                        <img src={product.image} className="w-100" />
                                        <h5>{product.name} </h5>
                                        <small className="text-muted">{product.code} </small>
                                        <div>${product.price}</div>
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                </div>
        );
    }

    async populateData() {
        const body = {
            query: `query {
              products {
                name,
                code,
                image,
                price
              }
            }`,
            variables: {}
        }

        axios.post("http://localhost:50308/graphql", body)
            .then(res => {
                console.log(res.data)
                this.setState({ products: res.data.data.products, loading: false })
            })
    }
}
