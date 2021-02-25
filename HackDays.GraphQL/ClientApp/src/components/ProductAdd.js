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

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeImageUrl = this.onChangeImageUrl.bind(this);
        this.onChangeCode = this.onChangeCode.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
       this.populateData();
    }

    onChangeProductName(e) {
        var product = { ...this.state.product }
        product.name = e.target.value;
        this.setState({ product: product })
    }
    onChangeImageUrl(e) {
        var product = { ...this.state.product }
        product.imageUrl = e.target.value;
        this.setState({ product: product })
    }
    onChangeCode(e) {
        var product = { ...this.state.product }
        product.code = e.target.value;
        this.setState({ product: product })
    }
    onChangePrice(e) {
        var product = { ...this.state.product }
        product.price = parseFloat(e.target.value);
        this.setState({ product: product })
    }
    onChangeCategory(e) {
        var product = { ...this.state.product }
        product.category = e.target.value;
        this.setState({ product: product })
    }
    onChangeDescription(e) {
        var product = { ...this.state.product }
        product.description = e.target.value;
        this.setState({ product: product })
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
                                        <input type="number" value={this.state.product.price} onChange={this.onChangePrice} className="form-control" />
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

        axios.post("http://localhost:50308/graphql", body)
            .then(res => {
                console.log(res.data)
                alert('Add new product success');
                if (res.data.data.product.id > 0) {
                    this.props.history.push('/');
                }
            })
    }
}
