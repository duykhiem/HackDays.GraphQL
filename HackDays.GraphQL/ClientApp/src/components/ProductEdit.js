import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

export class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            loading: true
        };
    }

    componentDidMount() {
        this.populateData(this.props.match.params.id);
    }

    render() {
        return (
            this.state.loading
                ? <p><em>Loading...</em></p> :
                <React.Fragment>
                    <div className="row">
                        <div className="col-md-4">
                            <img src={this.state.product.imageUrl} className="w-100" />
                        </div>
                        <div className="col-md-8">
                            <h5>{this.state.product.name} </h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <h5 className="text-muted">{this.state.product.code} </h5>
                                    <label>Select color</label>
                                    <select className="form-control">
                                        <option>White</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <h5 className="text-muted">${this.state.product.price} </h5>
                                    <label>Select size</label>
                                    <select className="form-control">
                                        <option>L</option>
                                    </select>
                                </div>
                            </div>
                            <p className="pt-4">
                                {this.state.product.description}
                            </p>
                        </div>
                    </div>
                    <Link to='/' className="btn btn-secondary" style={{ marginTop: 50 }} >Back</Link>
                </React.Fragment >
        );
    }

    async populateData(id) {
        const body = {
            query: `query {
              product(id: ${id}) {
                name,
                code,
                imageUrl,
                price,
                description
              }
            }`,
            variables: {}
        }

        axios.post("http://localhost:50308/graphql", body)
            .then(res => {
                console.log(res.data)
                this.setState({ product: res.data.data.product, loading: false })
            })
    }
}
