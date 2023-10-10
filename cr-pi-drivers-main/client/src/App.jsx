import {Routes, Route} from "react-router-dom"
import Home from './views/home/home'
import Detail from './views/detail/detail'
import Create from "./views/create/create"
import Landing from "./views/landing/landing"



function App() {
 

  return (
     
      <div>
        <Routes>
        <Route exact path="/home" element= {<Home/>} /> 
        <Route path="/home/:id" element = { <Detail/>} />
        <Route path="/create" element = { <Create/>} />
        <Route path= "/" element = {<Landing/> } />
        </Routes>
      </div>
    
  )
}

export default App
