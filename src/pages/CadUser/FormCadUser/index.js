import React, {useState, useEffect} from 'react'
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

	useEffect(()=>{
		if(user){
			setLogin(user.login)
			setName(user.name)
			setEmail(user.email)
			setSsaVatId(user.ssa_vat_id)
			setImage(user.image)
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

	
	return (
		<>
			<form action="" className="CadUserContainer">
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
						<input type="text" id="userPass" name="userPass" value={password} onChange={event=>setPassword(event.target.value)}/>
					</div>
				</div>
				<div className="input-fields">
					<div className="input-group">
						<label htmlFor="userCPF">CPF</label>
						<input type="text" id="userCPF" name="userCPF" value={cpfMask(ssa_vat_id||'')} onChange={event=>setSsaVatId(event.target.value)}/>
					</div>
					<div className="input-group">
						<label htmlFor="userPassConfirm">Confirmar Senha</label>
						<input type="text" id="userPassConfirm" name="userPassConfirm" value={passwordConfirm} onChange={event=>setPasswordConfirm(event.target.value)}/>
					</div>
				</div>
			</form>

		</>
	)
}

export default FormCadUser