import { Routes, Route, BrowserRouter } from "react-router-dom"
import {NextUIProvider} from "@nextui-org/react";

import './App.css'
import Home from "./pages/Home"
import DefaultLayout from "./layouts/DefaultLayout"
import NotFound from "./pages/NotFound";

function App() {

  return (
    <>
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
    </>
  )
}

export default App
