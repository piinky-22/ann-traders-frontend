class AddProductRequest {
    title: string;
    seller: string;
    description: string;
    category: string;
    img?: string;
    price: number;

    constructor(title: string, seller: string, description: string, category: string,
        price: number) {
            this.title = title;
            this.seller = seller;
            this.description = description;
            this.category = category;
            this.price = price;
        }
}

export default AddProductRequest;