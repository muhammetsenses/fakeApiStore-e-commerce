import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BasketItem {
  id: number;
  price: number;
  title: string;
  image: string;
  count: number;
}

const getBasketFromStorage = (): BasketItem[] => {
  const basket = localStorage.getItem("basket");
  if (basket) {
    return JSON.parse(basket);
  }
  return [];
};

const writeToBasketStorage = (basket: BasketItem[]) => {
  console.log("LocalStorage'a kaydedilecek sepet: ", basket);
  localStorage.setItem("basket", JSON.stringify(basket));
};

interface BasketState {
  items: BasketItem[];
  drawer: boolean;
  totalAmount: number;
}

const initialState: BasketState = {
  items: getBasketFromStorage(),
  drawer: false,
  totalAmount: 0,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<BasketItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.count += action.payload.count;
      } else {
        state.items.push(action.payload);
      }
      writeToBasketStorage(state.items);
    },
    setDrawer: (state) => {
      state.drawer = !state.drawer;
    },
    totalAmountBasket: (state) => {
      state.totalAmount = 0;
      state.items.map(
        (product) => (state.totalAmount += product.price * product.count)
      );
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      writeToBasketStorage(state.items)
    },
    decrementItem: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.count -= 1;
        if (item.count === 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }
        writeToBasketStorage(state.items)
      }
    },
    incrementItem: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.count += 1;
      }
      writeToBasketStorage(state.items)
    },
  },
});

export const {
  addToBasket,
  setDrawer,
  totalAmountBasket,
  removeItem,
  decrementItem,
  incrementItem,
} = basketSlice.actions;
export default basketSlice.reducer;
