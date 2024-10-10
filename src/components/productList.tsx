import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/slices/productSlice';
import { AppDispatch, RootState } from '../redux/store';
import Product from './product/product';

const ProductList = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {products} = useSelector((store:RootState) => store.product)


    useEffect(() => {
        dispatch(getAllProducts())
    },[])

  return (
    <div style={{display: "flex",gap:"2rem" , marginTop:"3rem", flexWrap:"wrap", justifyContent:"center"}}>
        {
            products && products.map((product) => (
                <Product key={product.id} product={product}/>
            ))
        }
    </div>
  )
}

export default ProductList;