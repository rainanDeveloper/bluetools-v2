import React from 'react'
import './App.css'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './pages/Login'
import DashBoard from './pages/DashBoard'
import CadCountry from './pages/CadCountry'
import CadUf from './pages/CadUf'
import CadCity from './pages/CadCity'
import CadCustomer from './pages/CadCustomer'
import CadContract from './pages/CadContract'

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Login}/>
				<Route path="/dashboard" exact component={DashBoard}/>
				<Route path="/pais" exact component={CadCountry}/>
				<Route path="/ufs" exact component={CadUf}/>
				<Route path="/cidades" exact component={CadCity}/>
				<Route path="/clientes" exact component={CadCustomer}/>
				<Route path="/contratos" exact component={CadContract}/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
