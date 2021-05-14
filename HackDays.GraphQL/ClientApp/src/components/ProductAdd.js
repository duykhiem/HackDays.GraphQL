import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

export class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {
                id: 0,
                name: '',
                imageUrl: '',
                code: '',
                price: 0,
                category: 'SHOES',
                description: '',
            },
            categories: [],
            loading: true
        };

        this.handleChanges = this.handleChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getCategories();
    }

    handleChanges = (event) => {
        const fieldName = event.target.name;
        const currentProduct = Object.assign({}, this.state.product);
        const targetValue = event.target.value;
        currentProduct[fieldName] = targetValue;
        this.setState({ product: currentProduct })
    };

    handleSubmit(event) {
        event.preventDefault();
        this.createProduct();
    }

    render() {
        return (
            this.state.loading
                ? <p><em>Loading...</em></p> :
                <React.Fragment>
                    <div>
                        <h2>Create Product</h2>
                        <div className="row">
                            <div className="col-md-6">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" name="name" value={this.state.product.name} onChange={this.handleChanges} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Image Url</label>
                                        <input type="text" name="imageUrl" value={this.state.product.imageUrl} onChange={this.handleChanges} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Code</label>
                                        <input type="text" name="code" value={this.state.product.code} onChange={this.handleChanges} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Price</label>
                                        <input type="number" name="price" value={this.state.product.price} onChange={this.handleChanges} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <input type="text" name="category" value={this.state.product.category} onChange={this.handleChanges} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea name="description" onChange={this.handleChanges} className="form-control">{this.state.product.description}</textarea>
                                    </div>
                                    <div className="form-group">
                                        <Link to='/' className="btn btn-secondary">Back</Link>
                                        <button type="submit" className="btn btn-primary mr-1 float-right">Add</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                </React.Fragment >
        );
    }

    async getCategories() {
        const body = {
            query: `
                query {
	                category: __type(name: "Category") {
                      items: enumValues {
                        name
                      }
                    }
                }
            `,
            variables: {}
        }

        axios.post(process.env.API_URL + "/graphql", body)
            .then(res => {
                console.log(res.data)
                this.setState({ categories: res.data.data.category.items, loading: false })
            })
    }

    async createProduct() {
        const body = {
            query: `
                mutation {
                  product: createProduct(product: {
    	              id: 0
                      name: "${this.state.product.name}"
                      code: "${this.state.product.code}"
                      description: "${this.state.product.description}"
                      imageUrl: "product/7.jfif"
                      price: ${this.state.product.price}
                      category: "SHOES"
                  }) {
                    id
                  }
                }
            `,
            variables: {}
        }

        axios.post(process.env.API_URL + "/graphql", body)
            .then(res => {
                console.log(res.data)
                alert('Add new product successfully!');
                if (res.data.data.product.id > 0) {
                    this.props.history.push('/');
                }
            })
    }
}
