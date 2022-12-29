import { Carousel } from "./Components/Carousel";
import { Category } from "./Components/Category";
import { Heros } from "./Components/Heros";
import { ShopServices } from "./Components/ShopServices";

export const HomePage = () => {
    return (
        <>
            <Category/>
            <Carousel/>
            <Heros/>
            <ShopServices/>
        </>
    );
}