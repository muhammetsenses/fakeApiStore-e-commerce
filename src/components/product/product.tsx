import { useNavigate } from "react-router-dom";
import  "./product.css"

import { useAppSelector } from "../../redux/hook";

export interface ProductProps {
  product: {
    id: number;
    price: number;
    image: string;
    title: string;
    description: string;
  };
}



const Product: React.FC<ProductProps> = ({ product }) => {
  const { id, price, image, title } = product;
  const {darkMode} = useAppSelector((store) => store.theme)
  const navigate = useNavigate()
 

  return (
    <div>
        <div className={"card"} style={{border: darkMode ? "1px solid wheat" :""}}>
            <div><img className="item-img" src={image} alt="" /></div>
            <div className="item-title">          
                <h3 style={{minHeight:"70px"}}>{title}</h3>
                <div className="price"><span style={{fontWeight:"bold"}}>{price} ₺</span></div>
            </div>
            <div style={{textAlign:"center"}}>
            <button onClick={() => navigate("/product-details/"+id)} className="button-item">Detayına Git</button>
            </div>
            
        </div>

    </div>
  )
};

export default Product;
