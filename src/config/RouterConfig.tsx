import {Routes, Route} from "react-router-dom"
import Home from "../pages/home";
import ProductDetails from "../pages/productdetails/ProductDetails";

const RouterConfig = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/product-details/:id" element={<ProductDetails />}></Route>
        </Routes>
    </div>
  )
}

export default RouterConfig;