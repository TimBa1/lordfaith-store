import {Route, Router , Routes} from "react-router-dom"
import Pay from "./Pay";
import Success from "./Success";


function App() {
  return (
      <Routes>
        <Route path="/pay" element={<Pay/>}/> 
        <Route path="/success" element={<Success/>}/>
      </Routes>
  
  );
}

export default App;
