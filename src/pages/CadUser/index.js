import React, {useState, useEffect} from 'react'
import HtmlModal from '../../components/HtmlModal'
import HtmlTable from '../../components/HtmlTable'
import SupMenuAdmin from '../../components/SupMenuAdmin'
import ToastDisplay from '../../components/ToastDisplay'
import { cpfMask } from '../../functions/Masks'

import api from '../../services/api'
import FormCadUser from './FormCadUser'

function CadUser(){
	
	const [users, setUsers] = useState([])
	const [userEdit, setUserEdit] = useState([])
	const [alert, setAlert] =  useState('')
	const [alertChanger, setAlertChanger] = useState(0)
	const [q, setQ] =  useState('')

	const auth = localStorage.getItem('authToken')

	useEffect(()=>{
		var query = ''
		if(q){
			query+=`?q=${q}`
		}

		api.get(`/user/${query}`, {
			headers: {
				auth
			}
		})
		.then(({data})=>{
			setUsers(data)
		})
	}, [setUsers, auth, q])

	function openModal(){
		const modal = document.querySelector('#modalUser')
		modal.classList.add('active')
	}

	function closeModal(){
		const modal = document.querySelector('#modalUser')
		modal.classList.remove('active')
	}

	function editItem(){
		const selectedUser = users.filter(u=>u.selected)[0]

		setUserEdit(selectedUser)

		if(selectedUser){
			openModal()
		}
		else{
			window.alert('Nenhum item selecionado!')
		}
	}

	function newItem(){
		setUserEdit(null)
		
		openModal()
	}

	function deleteItem(id){
		if(window.confirm(`Deseja realmente excluir usuário ${id}?`)){
			api.delete(`/user/${id}`,{
				headers:{
					auth
				}
			}).then(()=>{
				setUsers(users.filter(u=>(parseInt(u.id)!==parseInt(id))))
				setAlert(`Usuário ${id} deletado com sucesso!`)
				setAlertChanger(alertChanger+1)
			}).catch(error=>{
				if(error?.response?.status==401){
					setAlert(`Erro ao deletar Usuário ${id}: Operação não permitida!`)
					setAlertChanger(alertChanger+1)
				}
				else{
					setAlert(`Erro ao deletar Usuário ${id}`)
					setAlertChanger(alertChanger+1)
				}
			})
		}
	}

	function updateUserOnList(user){
		const findedUser = users.filter(u=>u.id===user.id)
		if(findedUser.length>0){
			setUsers(users.map(u=>{
				if(u.id===user.id){
					return user
				}
				else{
					return u
				}
			}))
		}
		else{
			setUsers([...users,user])
		}
	}

	function saveCallback(user){
		updateUserOnList(user)
		closeModal()
		setAlert(`Usuário ${user.name}(${user.id}) salvo com sucesso!`)
		setAlertChanger(alertChanger+1)
	}
	
	return (
	<>
		<SupMenuAdmin/>

		<div className="listContainer">
			<h1 className="titleListTable">Usuários</h1>
			<div className="utility">
			<div className="searchArea">
					<input type="text" id="searchInput" value={q} onChange={event=>setQ(event.target.value)} placeholder="Buscar..."/>
					</div>
					<div className="utilityButtons">
						<button onClick={newItem} className="color-primary">Novo</button>
						<button onClick={editItem} className="color-primary">Editar</button>
						<button className="color-primary">Exportar</button>
						<button className="color-primary">Imprimir</button>
					</div>
			</div>
			<HtmlTable id="tblUser" tableTitles={[
				{title: 'Código', dataKey: 'id'},
				{title: 'Nome', dataKey: 'name'},
				{title: 'Email', dataKey: 'email'},
				{title: 'CPF', dataKey: 'maskedVAT'}
			]}
			tableData={users.map(u=>{
				u.maskedVAT = cpfMask(u.ssa_vat_id||'')
				return u
			})}
			selection={true} selectionCallback={items=>{
				setUsers(items)
			}}
			delectionCallback={deleteItem}
			itemDoubleClickCallback={editItem}
			/>
			<HtmlModal titleModal={`Cadastro de Usuário`} modalId="modalUser">
				<FormCadUser user={userEdit} saveCallback={saveCallback}/>
			</HtmlModal>
			<ToastDisplay changer={alertChanger}>{alert}</ToastDisplay>
		</div>
		
	</>
	)
}

export default CadUser