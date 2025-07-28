import React from 'react'
import ReactDOM from 'react-dom/client'

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css';

// index.css'
import '../styles/index.css'

// components
import Home from './components/Home';
import Jumbotron from './components/Jumbotron';
import Test from './components/Test';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Jumbotron/>
    <Home/>
  </React.StrictMode>,
)
