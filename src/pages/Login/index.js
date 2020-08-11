import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import './style.css'
import {FiX} from 'react-icons/fi'
import logo from '../../common-assets/logo.png'
import api from '../../services/api'
function Login(){
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const history = useHistory()

	function handleLogin(event){
		event.preventDefault()

		api.post('user/login', {
			login,
			password
		}).then(response=>{
			localStorage.setItem('authToken',response.data.token)
			history.push('/dashboard')
		}).catch(error=>{
			if(error.response){
				if(error.response.data.message){
					setErrorMessage(error.response.data.message)
				}
			}
			else{
				setErrorMessage(`${error}`)
			}
			var modalContainer = document.querySelector('div#errorModal').closest('.modalBlackWindow')
			modalContainer.classList.add('active')
		})
	}

	function closeModal(event){
		const modal = event.target.closest('.modalBlackWindow')
		modal.classList.remove('active')
	}

	return (
		<>
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
						<input type="text" id="login" value={login} onChange={event=>setLogin(event.target.value)} required/>
					</div>
					<div className="input-group">
						<label htmlFor="password">Senha</label>
						<input type="password" value={password} onChange={event=>{
							setPassword(event.target.value)
							}} id="password" required/>
					</div>
					<button className="color-primary loginButton">
						Login
					</button>
				</form>
			</div>
		</div>
		<div className="modalBlackWindow">
			<div className="modal" id="errorModal">
				{errorMessage}
				<button onClick={closeModal} className="closeBtn">
					<FiX size={18}/>
				</button>
			</div>
		</div>
		</>
	)
}

export default Login