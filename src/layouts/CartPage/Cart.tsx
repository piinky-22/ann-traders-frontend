import { useEffect, useState } from "react";
import ProductModel from "../../models/ProductModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const Cart = () => {

    const [product, setProduct] = useState<ProductModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const productId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const fetchProduct = async () => {
            const baseUrl: string = `http://localhost:8080/api/products/${productId}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const loadedProduct: ProductModel = {
                id: responseJson.id,
                title: responseJson.title,
                seller: responseJson.seller,
                description: responseJson.description,
                category: responseJson.category,
                img: responseJson.img,
                price: responseJson.price,
            };

            setProduct(loadedProduct);
            setIsLoading(false);
        };
        fetchProduct().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    return (
        <div>
            <div className='homepage-carousel-title'>
                <h3>Your Cart</h3>
            </div>
            <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
                <div className='row g-0'>
                    <div className='col-md-2'>
                        <div className='d-none d-lg-block'>
                            {product?.img ?
                                <img src={product?.img}
                                    width='100'
                                    height='150'
                                    alt='Product'
                                />
                                :
                                <img src={require('../../Images/ProductsImages/tshirt.jpg')}
                                    width='100'
                                    height='150'
                                    alt='Product'
                                />
                            }
                        </div>
                        <div className='d-lg-none d-flex justify-content-center 
                        align-items-center'>
                            {product?.img ?
                                <img src={product?.img}
                                    width='100'
                                    height='150'
                                    alt='Product'
                                />
                                :
                                <img src={require('../../Images/ProductsImages/tshirt.jpg')}
                                    width='100'
                                    height='150'
                                    alt='Product'
                                />
                            }
                        </div>
                    </div>
                    <div className='col-md-4 d-flex justify-content-center align-items-center'>
                        <div className='col-md-8'>
                            <h4>
                                {product?.title}
                            </h4>
                        </div>
                    </div>
                    {/* <div className='col-md-1 d-flex justify-content-center align-items-center'>
                    <button className='btn btn-md main-color text-white'>
                        -
                    </button>
                </div>
                <div className='col-md-1 d-flex justify-content-center align-items-center'>
                    <div className='card-text'>
                        Qty: {product?.price}
                    </div>
                </div>
                <div className='col-md-1 d-flex justify-content-center align-items-center'>
                    <button className='btn btn-md main-color text-white'>
                        +
                    </button>
                </div> */}
                    <div className='col-md-4 d-flex justify-content-center align-items-center'>
                        <div className='col-md-2'>
                            <h4>
                                $ {product?.price}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}