import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Lazy } from './lib/LazyImports';
import useAuthChange from './hooks/useAuthChange';
import {UserContextProvider} from "./context/User/UserContextProvider"

const App = () => {
  const { loading, isAuthUser } = useAuthChange()

  if (loading) {
    return <>Loading...</> 
  }
  return (
    <UserContextProvider user={isAuthUser}>
      <ToastContainer theme='dark' />
      <Suspense fallback={<><h2>Loading Fallback...</h2></>}>
        <Routes>
          <Route path='/' element={<Lazy.Home />} />
          <Route path='*' element={<Lazy.Home />} />
          <Route path='/login' element={<Lazy.Login />} />
          <Route path='/signup' element={<Lazy.Signup />} />
          <Route path='/player/:id' element={<Lazy.Player />} />
        </Routes>
      </Suspense>
    </UserContextProvider>
  )
}

export default App
