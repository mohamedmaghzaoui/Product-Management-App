
import { Products } from "./components/Product";
import { Categories } from "./components/Category";
function App() {
  return <div style={{fontFamily:"Nunito"}} >
<div className="flex justify-center space-x-2 p-2">
  <div className="w-1/2 me-20">
    <Products />
  </div>
  <div className="w-1/3">
    <Categories />
  </div>
</div>



  </div>
}

export default App;
