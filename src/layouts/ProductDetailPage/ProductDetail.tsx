import { useEffect, useState } from "react";
import ProductModel from "../../models/ProductModel";
import ReviewModel from "../../models/ReviewModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarReview";
import { CheckoutAndReviewBox } from "./DetailAndReview";
import { LatestReviews } from "./LatestReviews";

export const ProductDetail = () => {

    const [product, setProduct] = useState<ProductModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Review State
    const [reviews, setReviews] = useState<ReviewModel[]>([])
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

    // const [isReviewLeft, setIsReviewLeft] = useState(false);
    // const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

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

    useEffect(() => {
        const fetchProductReviews = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByProductId?productId=${productId}`;

            const responseReviews = await fetch(reviewUrl);

            if (!responseReviews.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJsonReviews = await responseReviews.json();

            const responseData = responseJsonReviews._embedded.reviews;

            const loadedReviews: ReviewModel[] = [];

            let weightedStarReviews: number = 0;

            for (const key in responseData) {
                loadedReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    product_id: responseData[key].productId,
                    reviewDescription: responseData[key].reviewDescription,
                });
                weightedStarReviews = weightedStarReviews + responseData[key].rating;
            }

            if (loadedReviews) {
                const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }

            setReviews(loadedReviews);
            setIsLoadingReview(false);
        };

        fetchProductReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        })
    }, []);

    if (isLoading || isLoadingReview) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div>
            <div className='container d-none d-lg-block'>
                <div className='row mt-5'>
                    <div className='col-sm-2 col-md-2'>
                        {product?.img ?
                            <img src={product?.img} width='226' height='349' alt='Product' />
                            :
                            <img src={require('./../../Images/ProductsImages/tshirt.jpg')} width='226'
                                height='349' alt='Product' />
                        }
                    </div>
                    <div className='col-4 col-md-4 container'>
                        <div className='ml-2'>
                            <h2>{product?.title}</h2>
                            <h5 className='text-primary'>{product?.seller}</h5>
                            <p className='lead'>{product?.description}</p>
                            <StarsReview rating={totalStars} size={32} />
                        </div>
                    </div>
                    <CheckoutAndReviewBox product={product} mobile={false} />
                </div>
                <hr />
                <LatestReviews reviews={reviews} productId={product?.id} mobile={false} />
            </div>
            <div className='container d-lg-none mt-5'>
                <div className='d-flex justify-content-center align-items-center'>
                    {product?.img ?
                        <img src={product?.img} width='226' height='349' alt='Product' />
                        :
                        <img src={require('./../../Images/ProductsImages/tshirt.jpg')} width='226'
                            height='349' alt='Product' />
                    }
                </div>
                <div className='mt-4'>
                    <div className='ml-2'>
                        <h2>{product?.title}</h2>
                        <h5 className='text-primary'>{product?.seller}</h5>
                        <p className='lead'>{product?.description}</p>
                        <StarsReview rating={totalStars} size={32} />
                    </div>
                </div>
                <CheckoutAndReviewBox product={product} mobile={true} />
                <hr />
                <LatestReviews reviews={reviews} productId={product?.id} mobile={false} />
            </div>
        </div>
    );
}