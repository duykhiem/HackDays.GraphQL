import React from 'react';
import { Link } from 'react-router-dom';

export function ProductList(props) {

    const handleDelete = function (event, id, name) {
        event.preventDefault();
        if (window.confirm(`Are you sure you want to delete product "${name}" ?`)) {
            props.onDeleteProduct(id);
        }
    };

    return (
        <div className="row">
            {
                props.products.map((product) =>
                    <div key={product.id} className="col-md-3">
                        <div className="product-item">
                            <Link to={{ pathname: '/product/' + product.id + '/detail' }} className="text-decoration-none text-reset">
                                <img src={process.env.PUBLIC_URL + "/" + product.imageUrl} className="w-100" alt="product.name"/>
                                <h5>{product.name} </h5>
                                <small className="text-muted">{product.code} </small>
                                <div>${product.price}</div>
                            </Link>
                            <span className="product-actions">
                                <Link to={{ pathname: '/product/' + product.id + '/edit' }} ><i className="fa fa-pencil mr-2"></i></Link>
                                <i className="text-danger fa fa-trash" onClick={(e) => handleDelete(e, product.id, product.name)}></i>
                            </span>
                        </div>
                    </div>
                )
            }
        </div>
    );
};