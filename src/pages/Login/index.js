import React from 'react'
import {Link} from 'react-router-dom'
import './style.css'
import logo from '../../common-assets/logo.png'
function Login(){
	function handleLogin(event){
		event.preventDefault()
	}
	return (
		<div className="loginContainer">
			<div className="loginForm">
				<header>
					<div className="logoContainer">
						<Link to="/"><img src={logo} alt="Logo Bluetools"/></Link>
						<h1>Bluetools</h1>
					</div>
				</header>
				<form action="" onSubmit={handleLogin}>
					<div className="input-group">
						<label htmlFor="login">Login</label>
						<input type="text" id="login"/>
					</div>
					<div className="input-group">
						<label htmlFor="password">Senha</label>
						<input type="password" id="password"/>
					</div>
					<button className="color-primary loginButton">
						Login
					</button>
				</form>
			</div>
		</div>
	)
}

export default Login