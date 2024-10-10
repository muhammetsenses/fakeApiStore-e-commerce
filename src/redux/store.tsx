import { configureStore } from '@reduxjs/toolkit'
import appReducer from "../redux/slices/appSlice"
import productReducer from "../redux/slices/productSlice"
import basketReducer from "../redux/slices/basketSlice"
import themeReducer from "../redux/slices/themeSlice"
export const store = configureStore({
  reducer: {
    app: appReducer,
    product:productReducer,
    basket: basketReducer,
    theme:themeReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch