import React from 'react'
import ScrollToTop from '../components/ScrollToTop'
import { Outlet } from 'react-router-dom'


const App = () => {
  return (
    <>
    <ScrollToTop />
    <Outlet />
    </>
  )
}

export default App