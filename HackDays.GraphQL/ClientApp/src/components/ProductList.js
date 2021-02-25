import React from 'react';
import { Link } from 'react-router-dom';

export function ProductList(props) {
    return (
        <div className="row">
            {
                props.products.map((product) =>
                    <div className="col-md-3">
                        <div className="product-item">
                            <Link to={{ pathname: '/product/' + product.id }} className="text-decoration-none text-reset">
                                <img src={process.env.PUBLIC_URL + "/" + product.imageUrl} className="w-100" />
                                <h5>{product.name} </h5>
                                <small className="text-muted">{product.code} </small>
                                <div>${product.price}</div>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    );
};