import React from 'react';
import { Link } from 'react-router-dom';

export function ProductList(props) {
    return (
        <div className="row">
            {
                props.products.map((product) =>
                    <div className="col-md-3">
                        <div className="product-item">
                            <Link to={{ pathname: '/product/' + product.id + '/detail' }} className="text-decoration-none text-reset">
                                <img src={process.env.PUBLIC_URL + "/" + product.imageUrl} className="w-100" />
                                <h5>{product.name} </h5>
                                <small className="text-muted">{product.code} </small>
                                <div>${product.price}</div>
                                <span className="product-actions">
                                    <Link to={{ pathname: '/product/' + product.id + '/edit' }} ><i className="fa fa-pencil mr-2"></i></Link>
                                    <Link to="/product/add" className="text-danger"><i className="fa fa-trash"></i></Link>
                                </span>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    );
};