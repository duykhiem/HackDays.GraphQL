import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Home from './components/Home';
import { Mens } from './components/Mens';
import { Womens } from './components/Womens';
import { ProductDetail } from './components/ProductDetail';
import { AddProduct } from './components/ProductAdd';
import { EditProduct } from './components/ProductEdit';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/mens' component={Mens} />
                <Route path='/womens' component={Womens} />
                <Route path='/product/add' component={AddProduct} />
                <Route path='/product/:id/detail' component={ProductDetail} />
                <Route path='/product/:id/edit' component={EditProduct} />
            </Layout>
        );
    }
}
