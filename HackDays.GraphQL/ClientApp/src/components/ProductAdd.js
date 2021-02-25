import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

export class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {
                name: '',
                imageUrl: '',
                code: '',
                price: '',
                category: '',
                description: '',
            },
            categories: [],
            loading: true
        };

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeImageUrl = this.onChangeImageUrl.bind(this);
        this.onChangeCode = this.onChangeCode.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
       this.populateData();
    }

    onChangeProductName(e) {
        this.setState({ product: { name: e.target.value} })
    }
    onChangeImageUrl(e) {
        this.setState({ product: { imageUrl: e.target.value} })
    }
    onChangeCode(e) {
        this.setState({ product: { code: e.target.value} })
    }
    onChangePrice(e) {
        this.setState({ product: { price: e.target.value} })
    }
    onChangeCategory(e) {
        this.setState({ product: { category: e.target.value} })
    }
    onChangeDescription(e) {
        this.setState({ product: { description: e.target.value} })
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.submitData();
    }

    render() {
        return (
            this.state.loading
                ? <p><em>Loading...</em></p> :
                <React.Fragment>
                    <div>
                        <h2>Add Product</h2>
                        <div className="row">
                            <div className="col-md-6">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" value={this.state.product.name} onChange={this.onChangeProductName} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Image Url</label>
                                        <input type="text" value={this.state.product.imageUrl} onChange={this.onChangeImageUrl} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Code</label>
                                        <input type="text" value={this.state.product.code} onChange={this.onChangeCode} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Price</label>
                                        <input type="text" value={this.state.product.price} onChange={this.onChangePrice} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <input type="text" value={this.state.product.category} onChange={this.onChangeCategory} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea onChange={this.onChangeDescription} className="form-control">{this.state.product.description}</textarea>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary mr-1">Add</button>
                                        <Link to='/' className="btn btn-secondary">Back</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                </React.Fragment >
        );
    }

    async populateData() {
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

        axios.post("http://localhost:50308/graphql", body)
            .then(res => {
                console.log(res.data)
                this.setState({ categories: res.data.data.category.items, loading: false })
            })
    }

    async submitData() {
        const body = {
            query: `
                mutation {
	                createProduct(product: ${this.state.product}) {
                        id
                    }
                }
            `,
            variables: {}
        }

        axios.post("http://localhost:50308/graphql", body)
            .then(res => {
                console.log(res.data)
                alert('Add new product success');
                this.props.history.push('/');
            })
    }
}
