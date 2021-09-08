import React, { Component, useState, useEffect } from 'react';
import axios from 'axios'
import { CarouselImages } from './CarouselImages';
import { ProductList } from './ProductList'
import { Link } from 'react-router-dom';
import { gql, useSubscription } from "@apollo/client";

const RATES_UPDATED = gql`
  subscription {
    productMutated {
      name
      eventType
      id
    }
  }
`;

export const Home = (props) => {
    const [products, setProducts] = useState([]);
    const [alert, setAlert] = useState("");
    const [loading, setLoading] = useState(true);

    const getProducts = () => {
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
                setProducts(res.data.data.products);
                setLoading(false);
            })
    }

    useSubscription(
        RATES_UPDATED,
        { 
            variables: {},
            onSubscriptionData: (data) => {
                console.log(data);
                let message = "";
                if (data.subscriptionData.data?.productMutated?.eventType) {
                    message = "1 product has been " + data.subscriptionData.data?.productMutated?.eventType;
                }
                setAlert(message);
                getProducts();
            }
        },
    );

    const deleteProduct = (id) => {
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

                }
            })
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div>
            <CarouselImages />
            {
                loading
                    ? <p><em>Loading...</em></p> :
                    <div className="flashSale">
                        <h1>{alert}</h1>
                        <h2>
                            FLASH SALE!!!
                            <small className="float-right"><Link to="/product/add" className="btn btn-default" >Create product</Link></small>
                        </h2>
                        <ProductList products={products} onDeleteProduct={(id) => deleteProduct(id)} />
                    </div>
            }
        </div>
    );
}
