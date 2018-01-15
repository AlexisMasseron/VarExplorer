import React from 'react'
import { render } from 'react-dom'
//components
import Connexion from './components/Connexion'  
import App from './components/App'
import NotFound from './components/NotFound'
//Router
import { BrowserRouter, Match, Miss } from 'react-router'
//CSS
import './index.css'

const Route = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={Connexion} />
        <Match exactly pattern="/acc/:account" component={App} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

render(
  <Route />,
  document.getElementById('root')
);
