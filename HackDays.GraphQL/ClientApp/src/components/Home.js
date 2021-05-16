import React, { Component } from 'react';
import { CarouselImages } from './CarouselImages';
import ProductList from './ProductList';
import { Link } from 'react-router-dom';
import * as productActions from '../redux/actions/productActions';
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";

class Home extends React.Component {
    componentDidMount() {
        const { products, actions } = this.props;

        if (products.length === 0) {
            actions.loadProducts().catch(error => {
              alert("Loading products failed" + error);
            });
        }
    }

    handleDeleteProduct = async product => {
        const { products, actions } = this.props;

        if (window.confirm(`Are you sure you want to delete product "${product.name}" ?`)) {
            toast.success("Product deleted");
            try {
              actions.deleteProduct(product.id).then(() => {
                  actions.loadProducts(products.filter(m=> m.id !== product.id))
              });
            } catch (error) {
              toast.error("Delete failed. " + error.message, { autoClose: false });
            }
        }
    };

    render() {

        return (
            <div>
                <CarouselImages />
                {
                    this.props.loading
                        ? <p><em>Loading...</em></p> :
                        <div className="flashSale">
                            <h2>
                                FLASH SALE!!!
                                <small className="float-right"><Link to="/product/add" className="btn btn-default" >Create product</Link></small>
                            </h2>
                            <ProductList products={this.props.products} history={this.props.history} onDeleteProduct={(product) => this.handleDeleteProduct(product)} />
                        </div>
                }
            </div>
        );
    }
}

Home.propTypes = {
    products: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        products: state.products || [],
        loading: state.apiCallsInProgress > 0
    };
}

function mapDispatchToProps(dispatch) {
    return {
      actions: {
        loadProducts: bindActionCreators(productActions.loadProducts, dispatch),
        deleteProduct: bindActionCreators(productActions.deleteProduct, dispatch)
      }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home);