class ProductModel {
    id: number;
    title: string;
    seller?: string;
    description?: string;
    category?: string;
    img?: string;
    price: number;

    constructor (id: number, title: string, seller: string, description: string, 
        category: string, img: string, price: number) {
            this.id = id;
            this.title = title;
            this.seller = seller;
            this.description = description;
            this.category = category;
            this.img = img;
            this.price = price;
    }
}

export default ProductModel;