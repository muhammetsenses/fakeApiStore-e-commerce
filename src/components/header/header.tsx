import { CiDark, CiLight, CiShoppingCart } from "react-icons/ci";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { useAppSelector } from "../../redux/hook";
import { useDispatch } from "react-redux";
import { setDrawer } from "../../redux/slices/basketSlice";
import logo from "../../images/logo.png";
import { toggleTheme } from "../../redux/slices/themeSlice";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { items } = useAppSelector((store) => store.basket);
  const darkMode  = useAppSelector((store) => store.theme.darkMode);
  const dispatch = useDispatch();

  console.log(items);

  const allProduct = useAppSelector((store) => store.product);
  console.log(allProduct);

  const fuse = new Fuse(allProduct.products, {
    keys: ["title"],
    threshold: 0.3,
  });

  const searchResults = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : [];

  const handleClickProduct = () => {
    setSearchQuery("")
  }

  const changeTheme = () => {
    dispatch(toggleTheme());
  };

  useEffect(() =>{
    const root = document.getElementById("root")
    if(root){
      root.style.backgroundColor = darkMode ? "black":"white";
      root.style.color = darkMode ? "white" :"black"
    }
  },[darkMode])

  return (
    <div className="header">
    <div className=" wrapper">
      <div className="logo-wrapper">
        <img onClick={() => navigate("/")} className="logo" src={logo} />
        <p style={{fontWeight:"bold"}}>FAKEAPİ STORE</p>
      </div>
      <div className="header-right">
        <div style={{ position: "relative" }}>
          <input
          className="search-input"
          
            type="text"
            name=""
            id="input"
            placeholder="Ürün Ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {
            
            searchQuery.length > 2 && searchResults.length > 0 ? 
            <div className="searchList" style={{backgroundColor: darkMode ? "black": "white",
              border: darkMode ?  "1px solid white" : "1px solid white;"
            }}>
            <ul style={{marginLeft:"-40px",}}>
              { searchResults.map((item) => (
                <Link onClick={() => handleClickProduct()} to={"/product-details/"+item.id} key={item.id} className="item" style={{color: darkMode? "white" : "black"}}>
                  <div style={{display:"flex", alignItems:"center", gap:"2rem", boxShadow:" -1px 9px 22px -7px rgba(0,0,0,0.75)",paddingInline:".5rem", border: darkMode ? "1px solid white" :"1px solid #e5e5e5"}}>
                    <div style={{width:"50px", height:"50px"}}>
                      <img style={{width:"50px", height:"50px", textAlign:"center"}} src={item.image} alt="" />
                    </div>
                    
                    <div>
                      <h4>{item.title}</h4>
                      <p style={{color:"brown", fontWeight:"bold"}}>{item.price} <span style={{color:darkMode ? "white":"black"}}>₺</span></p>
                    </div>
                  </div>
                </Link>
              ))}
            </ul>
          </div> : ""
          }
          
        </div>

        <div className="icon-wrapper">
          {darkMode ? (
            <CiLight onClick={() => changeTheme()} className="icon" />
          ) : (
            <CiDark onClick={() => changeTheme()} className="icon" />
          )}

          <Badge badgeContent={items.length} color="success">
            <CiShoppingCart
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(setDrawer())}
              className="icon"
            />
          </Badge>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Header;
