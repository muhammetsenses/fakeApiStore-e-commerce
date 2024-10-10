
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Loading = () => {

    const {loading} = useSelector((store:RootState)=> store.product)

  return (
    
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={loading}
     
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  
  )
}

export default Loading