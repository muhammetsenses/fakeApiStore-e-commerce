import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./productDetails.css";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../redux/slices/basketSlice";
import axios from "axios";
import { useAppSelector } from "../../redux/hook";

interface ProductProps {
  id: number;
  price: number;
  image: string;
  title: string;
  description: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductProps | undefined>(undefined);
  const [count, setCount] = useState(1);
  const theme = useAppSelector((store) => store.theme.darkMode)
  const dispatch = useDispatch();

  console.log(theme)
useEffect(() => {
  const getProductDetails = async () => {
    const response = await axios.get("https://fakestoreapi.com/products/"+id)
    const data = response.data
    
    setProduct(data)
  }
  
  getProductDetails()
},[id])


  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

   const handleAddToBasket = () => {
    if (product) {
      const basketItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        count: count,
        image:product.image
      };
      dispatch(addToBasket(basketItem));
      
    }
  };

  return (
    <div style={{minHeight:"100dvh"}}>
    <div
      style={{
        marginTop: "8rem",
        display: "flex",
        gap: "2rem",
        padding:"1rem",
        border:"1px solid wheat"
      }}
    >
      <div>
        <img className="product-image" src={product?.image} alt="" />
      </div>
      <div className="product-feature">
        <h2>{product?.title}</h2>
        <p>{product?.description}</p>
        <div style={{ color: "red", fontWeight: "bold", fontSize: "2rem" }}>
          {product?.price} ₺
        </div>
        <div className="count-wrapper">
          <button onClick={() => decrement()}>
            <CiCircleMinus style={{
              fontSize:"2rem",
              color: theme ? "white" : "black"
            }} />
          </button>
          <span style={{ fontSize: "2rem", color: "red", fontWeight: "bold" }}>
            {count}
          </span>
          <button onClick={() => increment()}>
            <CiCirclePlus style={{
              fontSize:"2rem",
              color: theme ? "white" : "black"
            }} /> 
          </button>
        </div>
        <div style={{ textAlign: "center" }}>
          <button onClick={handleAddToBasket} className="addtobasket">
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductDetails;
