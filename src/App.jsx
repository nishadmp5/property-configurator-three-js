import React from 'react'
import { Layout } from './components/layout'
import { preloadAssets } from './components/Scene/Preloader'

preloadAssets()

const App = () => {
  return (
   <Layout/>
  )
}

export default App