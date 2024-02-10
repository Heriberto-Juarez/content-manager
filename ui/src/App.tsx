import { Routes, Route, BrowserRouter } from "react-router-dom"

import './App.css'
import Home from "./pages/Home"
import DefaultLayout from "./layouts/DefaultLayout"
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
