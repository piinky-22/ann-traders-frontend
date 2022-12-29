import { useEffect, useState } from 'react';
import ProductModel from '../../models/ProductModel';
import { Pagination } from '../Utils/Pagination';
import { SpinnerLoading } from '../Utils/SpinnerLoading';
import { SearchProduct } from './Components/SearchProduct';

export const SearchProductsPage = () => {

    const [products, setProducts] = useState<ProductModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);
    const [totalAmountOfProducts, setTotalAmountOfProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [categorySelection, setCategorySelection] = useState('Product category');
    

    useEffect(() => {
        const fetchProducts = async () => {
            const baseUrl: string = "http://localhost:8080/api/products";

            let url: string = '';

            if (searchUrl === '') {
                url = `${baseUrl}?page=${currentPage - 1}&size=${productsPerPage}`;
            } else {
                url = baseUrl + searchUrl;
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.products;

            setTotalAmountOfProducts(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

            const loadedProducts: ProductModel[] = [];

            for (const key in responseData) {
                loadedProducts.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    seller: responseData[key].seller,
                    description: responseData[key].description,
                    category: responseData[key].category,
                    img: responseData[key].img,
                    price: responseData[key].price,
                });
            }

            setProducts(loadedProducts);
            setIsLoading(false);
        };
        fetchProducts().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [currentPage, searchUrl]);

    if (isLoading) {
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

    const searchHandleChange = () => {
        if (search === '') {
            setSearchUrl('');
        } else {
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=0&size=${productsPerPage}`)
        }
    }

    const categoryField = (value: string) => {
        if (
            value.toLowerCase() === 'clothing' || 
            value.toLowerCase() === 'sports'
        ) {
            setCategorySelection(value);
            setSearchUrl(`/search/findByCategory?category=${value}&page=0&size=${productsPerPage}`)
        } else {
            setCategorySelection('All');
            setSearchUrl(`?page=0&size=${productsPerPage}`)
        }
    }

    const indexOfLastProduct: number = currentPage * productsPerPage;
    const indexOfFirstProduct: number = indexOfLastProduct - productsPerPage;
    let lastItem = productsPerPage * currentPage <= totalAmountOfProducts ?
        productsPerPage * currentPage : totalAmountOfProducts;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className='container'>
                <div>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input className='form-control me-2' type='search'
                                    placeholder='Search' aria-labelledby='Search'
                                    onChange={e => setSearch(e.target.value)} />
                                <button className='btn btn-outline-success'
                                    onClick={() => searchHandleChange()}>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle' type='button'
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                    aria-expanded='false'>
                                    {categorySelection}
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li onClick={() => categoryField('All')}>
                                        <a className='dropdown-item' href='#'>
                                            All
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Sports')}>
                                        <a className='dropdown-item' href='#'>
                                            Sports
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Clothing')}>
                                        <a className='dropdown-item' href='#'>
                                            Clothing
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {totalAmountOfProducts > 0 ?
                        <>
                            <div className='mt-3'>
                                <h5>Number of results: ({totalAmountOfProducts})</h5>
                            </div>
                            <p>
                                {indexOfFirstProduct} to {lastItem} of {totalAmountOfProducts} items:
                            </p>
                            {products.map(product => (
                                <SearchProduct product={product} key={product.id} />
                            ))}
                        </>
                        :
                        <div className='m-5'>
                            <h3>
                                Can't find what you are looking for?
                            </h3>
                            <a type='button' className='btn main-color btn-md px-4 me-md-2 fw-bold text-white'
                                href='#'>Shopping Services</a>
                        </div>
                    }
                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    }
                </div>
            </div>
        </div>
    );
}