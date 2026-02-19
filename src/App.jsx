import React from 'react'
import { Layout } from './components/Layout'
import { preloadAssets } from './utils/preloader'

preloadAssets()

const App = () => {
  return (
   <Layout/>
  )
}

export default App