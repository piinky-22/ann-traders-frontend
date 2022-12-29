import { useState } from 'react';
import AddProductRequest from '../../models/AddProductRequest';

export const AddNewProduct = () => {

    // New Product
    const [title, setTitle] = useState('');
    const [seller, setSeller] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Category');
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [price, setPrice] = useState(0);

    // Displays
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    function categoryField(value: string) {
        setCategory(value);
    }

    async function base64ConversionForImages(e: any) {
        if (e.target.files[0]) {
            getBase64(e.target.files[0]);
        }
    }

    function getBase64(file: any) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setSelectedImage(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error', error);
        }
    }

    async function submitNewProduct() {
        const url = `http://localhost:8080/api/products/add`;
        if ( title !== '' && seller !== '' && category !== 'Category' 
            && description !== '' && price > 0) {
                const product: AddProductRequest = new AddProductRequest(title, seller, description, category, price);
                product.img = selectedImage;
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product)
                };

                const submitNewProductResponse = await fetch(url, requestOptions);
                if (!submitNewProductResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                setTitle('');
                setSeller('');
                setDescription('');
                setCategory('Category');
                setSelectedImage(null);
                setPrice(0);
                setDisplayWarning(false);
                setDisplaySuccess(true);
            } else {
                setDisplayWarning(true);
                setDisplaySuccess(false);
            }
    }

    return (
        <div className='container mt-5 mb-5'>
            {displaySuccess && 
                <div className='alert alert-success' role='alert'>
                    Product added successfully
                </div>
            }
            {displayWarning && 
                <div className='alert alert-danger' role='alert'>
                    All fields must be filled out
                </div>
            }
            <div className='card'>
                <div className='card-header'>
                    Add a new product
                </div>
                <div className='card-body'>
                    <form method='POST'>
                        <div className='row'>
                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>Title</label>
                                <input type="text" className='form-control' name='title' required 
                                    onChange={e => setTitle(e.target.value)} value={title} />
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'> Seller </label>
                                <input type="text" className='form-control' name='seller' required 
                                    onChange={e => setSeller(e.target.value)} value={seller}/>
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'> Category</label>
                                <button className='form-control btn btn-secondary dropdown-toggle' type='button' 
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                                        {category}
                                </button>
                                <ul id='addNewProductId' className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li><a onClick={() => categoryField('sports')} className='dropdown-item'>Sports</a></li>
                                    <li><a onClick={() => categoryField('clothing')} className='dropdown-item'>Clothing</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-md-12 mb-3'>
                            <label className='form-label'>Description</label>
                            <textarea className='form-control' id='exampleFormControlTextarea1' rows={3} 
                                onChange={e => setDescription(e.target.value)} value={description}></textarea>
                        </div>
                        <div className='col-md-3 mb-3'>
                            <label className='form-label'>Price</label>
                            <input type='number' className='form-control' name='Price' required 
                                onChange={e => setPrice(Number(e.target.value))} value={price}/>
                        </div>
                        <input type='file' onChange={e => base64ConversionForImages(e)}/>
                        <div>
                            <button type='button' className='btn btn-primary mt-3' onClick={submitNewProduct}>
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}