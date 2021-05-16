import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProductList(props) {
    let { products, onDeleteProduct, history} = props;
    return (
        <div className="row">
            {
                products.map((product) =>
                    <div className="col-md-3" key={product.id}>
                        <div className="product-item">
                            <Link to={{ pathname: '/product/' + product.id + '/detail' }} className="text-decoration-none text-reset">
                                <img src={ "/public/" + product.imageUrl} className="w-100" />
                                <h5>{product.name} </h5>
                                <small className="text-muted">{product.code} </small>
                                <div>${product.price}</div>
                                <span className="product-actions">
                                    <img src={require('../assets/edit-pen.png')} onClick={(e) => {
                                        e.preventDefault();
                                        history.push(`/product/${product.id}/edit`);
                                    }}
                                    className="mr-2"
                                    width="20" />
    
                                    <img src={require('../assets/recycle-bin.png')} onClick={(e) => {
                                        e.preventDefault();
                                        onDeleteProduct(product);}}
                                        width="20" />
                                </span>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    onDeleteProduct: PropTypes.func.isRequired
};

export default ProductList;