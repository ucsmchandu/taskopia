import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import AiHelpAssistant from '../components/AiHelpAssistant'
const Layout = () => {
  const location = useLocation()
  const showAiWidget = !location.pathname.startsWith('/ai/help/center')

  return (
    <>
    <Navbar/>
    {showAiWidget && <AiHelpAssistant variant="widget" />}
    <Outlet/>
     <Footer/>
    </>
  )
}

export default Layout