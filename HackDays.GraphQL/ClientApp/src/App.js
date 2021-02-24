import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Mens } from './components/Mens';
import { Womens } from './components/Womens';
import { ProductDetail } from './components/ProductDetail';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/mens' component={Mens} />
                <Route path='/womens' component={Womens} />
                <Route path='/product/:id' component={ProductDetail} />
            </Layout>
        );
    }
}
