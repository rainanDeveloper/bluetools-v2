import React, {useState, useEffect, useRef} from 'react'
import './style.css'
import api from '../../../services/api'
import defaultUserImg from '../../../common-assets/user-default.jpg'
import { cpfMask } from '../../../functions/Masks'


function FormCadUser({user, saveCallback=((u)=>{})}){

	const [login, setLogin]							= useState(user?user.login:'')
	const [name, setName]							= useState(user?user.name:'')
	const [password, setPassword]					= useState('')
	const [passwordConfirm, setPasswordConfirm]		= useState('')
	const [email, setEmail]							= useState(user?user.email:'')
	const [ssa_vat_id, setSsaVatId]					= useState(user?user.ssa_vat_id:'')
	const [image, setImage]							= useState(user?user.image:'')

	const passInputRef			= useRef()
	const passConfirmInputRef	= useRef()

	const auth = localStorage.getItem('authToken')

	useEffect(()=>{
		if(user){
			setLogin(user.login)
			setName(user.name)
			setEmail(user.email)
			setSsaVatId(user.ssa_vat_id)
			setImage(user.image||defaultUserImg)
		}
		else{
			setLogin('')
			setName('')
			setPassword('')
			setPasswordConfirm('')
			setEmail('')
			setSsaVatId('')
			setImage(defaultUserImg)
		}
	}, [user])

	function saveUser(event){
		event.preventDefault()

		if((!user?.id&&password.length<8)||(password!==passwordConfirm)){
			passInputRef.current.setCustomValidity('Senha deve ser igual à confirmação, e deve conter no mínimo 8 caracteres!')
			passInputRef.current.reportValidity()
			
			return false
		}

		api.post('/user/',
		{
			...(user?.id?{id: user.id}:{}),
			login,
			password_unhashed: password,
			name,
			ssa_vat_id,
			email,
			image
		}, {
			headers: {
				auth
			}
		})
		.then(({data})=>{
			setLogin('')
			setName('')
			setPassword('')
			setPasswordConfirm('')
			setEmail('')
			setSsaVatId('')
			setImage(defaultUserImg)
			saveCallback(data)
		})
		.catch(()=>{

		})
	}


	return (
		<>
			<form action="" onSubmit={saveUser} className="CadUserContainer">
				<div className="imgContainer">
					<div>
						<img src={image} alt="Imagem de usuário"/>
					</div>
				</div>
				<div className="input-group">
					<label htmlFor="userLogin">Login</label>
					<input type="text" id="userLogin" name="userLogin" value={login} onChange={event=>setLogin(event.target.value)}/>
				</div>
				<div className="input-group">
					<label htmlFor="userName">Nome</label>
					<input type="text" id="userName" name="userName" value={name} onChange={event=>setName(event.target.value)}/>
				</div>
				<div className="input-fields">
					<div className="input-group">
						<label htmlFor="userEmail">Email</label>
						<input type="text" id="userEmail" name="userEmail" value={email} onChange={event=>setEmail(event.target.value)}/>
					</div>
					<div className="input-group">
						<label htmlFor="userPass">Senha</label>
						<input type="password" id="userPass" name="userPass" value={password} onChange={event=>{
							setPassword(event.target.value)
							event.target.setCustomValidity('')
							event.target.reportValidity()
						}} ref={passInputRef}/>
					</div>
				</div>
				<div className="input-fields">
					<div className="input-group">
						<label htmlFor="userCPF">CPF</label>
						<input type="text" id="userCPF" name="userCPF" value={cpfMask(ssa_vat_id||'')} onChange={event=>setSsaVatId(event.target.value.replace(/\D/g, ''))} maxLength={14} />
					</div>
					<div className="input-group">
						<label htmlFor="userPassConfirm">Confirmar Senha</label>
						<input type="password" id="userPassConfirm" name="userPassConfirm" value={passwordConfirm} onChange={event=>setPasswordConfirm(event.target.value)}  ref={passConfirmInputRef}/>
					</div>
				</div>
				<footer className="save">
					<button type="submit" className="btnSave color-secondary-dark">Salvar</button>
				</footer>
			</form>
		</>
	)

}

export default FormCadUser