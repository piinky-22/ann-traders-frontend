import React from 'react'
import { Link } from 'react-router-dom';
import ProductModel from '../../../models/ProductModel';

export const ReturnProduct: React.FC<{ product: ProductModel }> = (props) => {
    return (
        <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
            <div className='text-center'>
                {props.product.img ?
                    <img
                        src={props.product.img}
                        width='151'
                        height='233'
                        alt="product"
                    />
                    :
                    <img
                        src={require('./../../../Images/ProductsImages/tshirt.jpg')}
                        width='151'
                        height='233'
                        alt="product"
                    />
                }
                <h6 className='mt-2'>{props.product.title}</h6>
                <p>${props.product.price}</p>
                <Link className="btn main-color text-white" to={`product/${props.product.id}`}>Reserve</Link>
            </div>
        </div>
    );
}