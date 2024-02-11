import { Routes, Route, BrowserRouter } from "react-router-dom"
import { ToastContainer } from 'react-toastify';

import { RecoilRoot } from 'recoil'

import Home from "./pages/Home"
import DefaultLayout from "./layouts/DefaultLayout"
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";



import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import RecoilNexus from "recoil-nexus";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Logout from "./pages/dashboard/Logout";
import Categories from "./pages/dashboard/Categories";
import Topics from "./pages/dashboard/Topics";
import Content from "./pages/Content";

function App() {
  return (
    <>
      <RecoilRoot>
        <RecoilNexus />
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/categories" element={<Categories />} />
              <Route path="/dashboard/content" element={<Content />} />
              <Route path="/dashboard/topics" element={<Topics />} />
              <Route path="/dashboard/logout" element={<Logout />} />
            </Route>
            <Route path="/" element={<DefaultLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Route>
            <Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default App
