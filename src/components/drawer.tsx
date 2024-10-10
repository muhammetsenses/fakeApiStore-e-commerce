import { useEffect } from "react";
import Drawer from "@mui/material/Drawer";

import { useAppSelector } from "../redux/hook";
import { useDispatch } from "react-redux";
import {
  decrementItem,
  incrementItem,
  removeItem,
  setDrawer,
  totalAmountBasket,
} from "../redux/slices/basketSlice";
import { FaTrash } from "react-icons/fa";

export default function TemporaryDrawer() {
  const basket = useAppSelector((store) => store.basket.items);
  const drawerOpen = useAppSelector((store) => store.basket.drawer);
  const amount = useAppSelector((store) => store.basket.totalAmount);
  const dispatch = useDispatch();
  const theme = useAppSelector((store) => store.theme.darkMode)
  console.log(amount);
  console.log(theme)
  
  useEffect(() => {
    dispatch(totalAmountBasket());
  }, [basket]);

  const increment = (id: number) => {
    dispatch(incrementItem(id));
  };

  const decrement = (id: number, count: number) => {
    if (count > 1) {
      dispatch(decrementItem(id));
    } else {
      dispatch(removeItem(id));
    }
  };
  return (
    <div>
      <Drawer style={{width:"30%"}}   open={drawerOpen} onClose={() => dispatch(setDrawer())}>
        <div
        style={{
          color: theme ? "white" : "black",
          backgroundColor: theme ? "black" : "white",
          height:"100%",
          border:"1px solid white"
        }}
        >

        
        <h2 style={{ textAlign: "center", minWidth:"600px" }}>Sepetim</h2>
        {basket.map((item) => (
          <div
            style={{
              width: "600px",
              paddingBottom: "1rem",
              paddingInline: "1rem",
            }}
            key={item.id}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem",
                border: " 1px solid #e5e5e5",
              }}
            >
              <div style={{ width: "100px", height: "100px" }}>
                <img
                  src={item.image}
                  style={{ width: "100px", height: "100px" }}
                  alt=""
                />
              </div>

              <div style={{ display:"flex",justifyContent:"space-between", alignItems:"center", gap:"2rem" }}>
                <h4>{item.title}</h4>
                <div>
                  {item.count} x {item.price}
                </div>
                <div
                  style={{ display: "flex", gap: ".5rem", alignItems: "center" }}
                >
                  <button
                    onClick={() => decrement(item.id, item.count)}
                    style={{
                      backgroundColor: "green",
                      border: "none",
                      color: "white",
                      fontSize: "1rem",
                      width:"40px",
                      cursor:"pointer",
                      padding:".25rem"
                    }}
                  >
                    -
                  </button>
                  <span style={{fontWeight:"bold"}}>{item.count}</span>
                  <button
                    onClick={() => increment(item.id)}
                    style={{
                      backgroundColor: "green",
                      border: "none",
                      color: "white",
                      fontSize: "1rem",
                      width:"40px",
                      cursor:"pointer",
                      padding:".25rem",
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    style={{
                      backgroundColor: "red",
                      border: "none",
                      color: "white",
                      fontSize: "1rem",
                      paddingInline: "1rem",
                      cursor:"pointer",
                      fontWeight:"bold",
                      display:"flex",
                      paddingBlock:".25rem",
                      height:"26px"
                    }}
                  >
                    <FaTrash  /> 
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            width: "100%",
            textAlign: "center",
            marginBlock: "2rem",
            fontWeight: "bold",
          }}
        >
          Toplam Tutar  : {amount.toFixed(2)}
        </div>
        </div>
      </Drawer>
    </div>
  );
}
