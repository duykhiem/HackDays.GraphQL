import React, { Component } from 'react';
import axios from 'axios'
import { CarouselImages } from './CarouselImages';
import { ProductList } from './ProductList'
import { Link } from 'react-router-dom';
export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: true
        };
    }

    componentDidMount() {
        this.getProducts();
    }

    render() {

        return (
            <div>
                <CarouselImages />
                {
                    this.state.loading
                        ? <p><em>Loading...</em></p> :
                        <div className="flashSale">
                            <h2>
                                FLASH SALE!!!
                                <small className="float-right"><Link to="/product/add" className="btn btn-default" >Create product</Link></small>
                            </h2>
                            <ProductList products={this.state.products} onDeleteProduct={(id) => this.deleteProduct(id)} />
                        </div>
                }
            </div>
        );
    }

    async getProducts() {
        const body = {
            query: `query {
              products {
                id,
                name,
                code,
                imageUrl,
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

    async deleteProduct(id) {
        const body = {
            query: `
                    mutation {
                        status: deleteProduct(id: ${id})
                    }
                `,
            variables: {}
        }

        axios.post("http://localhost:50308/graphql", body)
            .then(res => {
                if (res.data.data.status) {
                    this.getProducts();
                }
            })
    }
}
