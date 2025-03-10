
import React from 'react' 
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, useLocation } from'react-router-dom'
import Navbar from './components/Navbar.jsx'
import HomePage from './pages/Home.jsx'
import AboutPage from './pages/About.jsx'
import ServicesPage from './pages/Services.jsx'
import PetProductsPage from './pages/product.jsx'
import AppointmentPage from './pages/Appointment.jsx'
import PetPage from './pages/Petpage.jsx'
import LoginWithGoogleButton from './pages/login.jsx'
import RegistartionForm from './pages/signup.jsx'
import Header from './components/header.jsx'
import Adminpannel from './admin pannel/adminpannel.jsx'
import {Provider} from 'react-redux'
import store from './reduxtoolkit/store.jsx'
import Profile from './pages/Profile.jsx'
import CartPage from './pages/Cartpage.jsx'
import Success from './pages/Success.jsx'
import EditProfile from './pages/Editprofilepage.jsx'
import UpdateEmailPassword from './pages/Editpassword.jsx'
import Footer from './pages/Footer.jsx'


function App() {
 
  const location=useLocation();
  const isadminpannel=location.pathname.includes('/adminpanel')



  return (
    <>
    <Provider store={store}>
      <div>
      {!isadminpannel && 
      <Header></Header>}
      </div>
      <div>
        {!isadminpannel &&
       <Navbar></Navbar>}
        </div>
       
        <div>

        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/Services" element={<ServicesPage/>} />
          <Route path="/products" element={<PetProductsPage/>} />
          <Route path="/appointments" element={<AppointmentPage/>} />
          <Route path="/pets" element={<PetPage/>} />
          <Route path="/login" element={<LoginWithGoogleButton/>} />
          <Route path="/signup" element={<RegistartionForm/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/update-profile" element={<EditProfile/>} />  
          <Route path="/change-password" element={<UpdateEmailPassword/>} />  
          <Route path="/CartPage" element={<CartPage/>} />
          <Route path="/success" element={<Success/>} />
          <Route path="/adminpanel/*" element={<Adminpannel/>} />

         </Routes>
        </div>
        <div>
      {!isadminpannel && 
      <Footer/>}
      </div>
       </Provider>
    </>
  )
}

export default App
