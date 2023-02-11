import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link
}from 'react-router-dom'

import Login from './components/Login';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<div><h1>Home page</h1></div>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App;
