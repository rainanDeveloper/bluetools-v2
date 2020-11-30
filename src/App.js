import React from 'react'
import './App.css'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './pages/Login'
import DashBoard from './pages/DashBoard'
import CadPais from './pages/CadPais'
import CadUf from './pages/CadUf'
import CadCity from './pages/CadCity'

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Login}/>
				<Route path="/dashboard" exact component={DashBoard}/>
				<Route path="/pais" exact component={CadPais}/>
				<Route path="/ufs" exact component={CadUf}/>
				<Route path="/cidades" exact component={CadCity}/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
