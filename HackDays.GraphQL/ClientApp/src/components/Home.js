import React, { Component } from "react";
import axios from "axios";
import { CarouselImages } from "./CarouselImages";
import { ProductList } from "./ProductList";
import { Link } from "react-router-dom";
import { useSubscription, gql } from "@apollo/client";

const PRODUCTS_SUBSCRIPTION = gql`
  subscription {
    productMutated {
      id
      name
      code
      price
      imageUrl
      eventType
    }
  }
`;

export const LatestUpdate = (props) => {
  const { data, loading } = useSubscription(
    PRODUCTS_SUBSCRIPTION,
    {
      variables: {},
      onSubscriptionData: (data) => {
        props.onProductChange(data.subscriptionData.data?.productMutated)
      }
    }
  );
  console.log("productMutated subscription: " + JSON.stringify(data));
  return !loading &&
    <div className="latestUpdate">
      <h5>
        <i className="fa fa-bullhorn margin-right-5" aria-hidden="true" />
        Latest update: Product "{data.productMutated.name}" has been {data.productMutated.eventType}
      </h5>
    </div>
}

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    return (
      <div>
        <CarouselImages />
        <LatestUpdate onProductChange={(product) => this.onProductChange(product)} />
        {this.state.loading ? (
          <p>
            <em>Loading...</em>
          </p>
        ) : (
          <div className="flashSale">
            <h2>
              <i className="fa fa-bolt margin-right-5" aria-hidden="true" />FLASH SALE!!!
              <small className="float-right">
                <Link to="/product/add" className="btn btn-default">
                  Create product
                </Link>
              </small>
            </h2>
            <ProductList
              products={this.state.products}
              onDeleteProduct={(id) => this.deleteProduct(id)}
            />
          </div>
        )}
      </div>
    );
  }

  onProductChange(product) {
    if (!product) {
      return;
    }

    let products = this.state.products.filter(m => m.id !== product.id);
    if (product.eventType === 'created' || product.eventType === 'updated') {
      products.push(product);
    }
    this.setState({ products: products });
  }

  async getProducts() {
    const body = {
      query: `
        query {
          products {
            id,
            name,
            code,
            imageUrl,
            price
          }
        }`,
      variables: {},
    };

    axios.post("http://localhost:50308/graphql", body).then((res) => {
      console.log(res.data);
      this.setState({ products: res.data.data.products, loading: false });
    });
  }

  async deleteProduct(id) {
    const body = {
      query: `
        mutation {
            status: deleteProduct(id: ${id})
        }
      `,
      variables: {},
    };

    axios.post("http://localhost:50308/graphql", body).then((res) => {
      if (res.data.data.status) {
        // this.getProducts();
      }
    });
  }
}
