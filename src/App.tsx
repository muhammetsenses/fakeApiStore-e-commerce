
import TemporaryDrawer from "./components/drawer"
import Header from "./components/header/header"
import Loading from "./components/Loading"
import RouterConfig from "./config/RouterConfig"
import PageContainer from "./container/pageContainer"


function App() {
 
  return (
    <>
      <div>
        
          <Header />
          <PageContainer>
          <RouterConfig/>
          <Loading/>
          <TemporaryDrawer />
         </PageContainer>
        
      </div>
    </>
  )
}

export default App
