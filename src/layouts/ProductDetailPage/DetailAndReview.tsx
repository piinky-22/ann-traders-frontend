import { Link } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import ProductModel from "../../models/ProductModel";

export const CheckoutAndReviewBox: React.FC<{ product: ProductModel | undefined, mobile: boolean, }> = (props) => {

    const { authState } = useOktaAuth();    
    
    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className='card-body container'>
                <div className='mt-3'>
                    <p>
                        <b>Product Details</b>
                    </p>
                    <hr />
                    {props.product && props.product.price > 0 ?
                        <h4 className='text-success'>
                            Available
                        </h4>
                        :
                        <h4 className='text-danger'>
                            Wait List
                        </h4>
                    }
                    <div className='row'>
                        <p className='col-6 lead'>
                            Price $
                            <b>{props.product?.price} </b>
                        </p>
                        <p className='col-6 lead'>
                            Seller:
                            <b> {props.product?.seller} </b>
                        </p>
                    </div>
                </div>
                {authState?.isAuthenticated ?
                    <Link to={`/cart/${props.product?.id}`} type='button' className='btn btn-success btn-lg'>
                        Add to cart
                    </Link>
                    :
                    <Link className='btn main-color btn-lg text-white' to='/login'>
                        Sign up
                    </Link>
                }                 
                <hr />
                <p className='mt-3'>
                    Leave a review.
                </p>
            </div>
        </div>
    );
}