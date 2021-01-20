import React, {useState, useEffect} from 'react'
import HtmlModal from '../../components/HtmlModal'
import HtmlTable from '../../components/HtmlTable'
import SupMenuAdmin from '../../components/SupMenuAdmin'
import ToastDisplay from '../../components/ToastDisplay'
import { cpfMask } from '../../functions/Masks'

import api from '../../services/api'

function CadUser(){
	
	const [users, setUsers] = useState([])
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

	function deleteItem(id){
		if(window.confirm(`Deseja realmente excluir UF ${id}?`)){
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
						<button className="color-primary">Novo</button>
						<button className="color-primary">Editar</button>
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
				u.maskedVAT = cpfMask(u.ssa_vat_id)
				return u
			})}
			selection={true} selectionCallback={items=>{
				setUsers(items)
			}}
			delectionCallback={deleteItem}
			/>
			<HtmlModal titleModal={`Cadastro de Usuário`} modalId="modalUser">
				
			</HtmlModal>
			<ToastDisplay changer={alertChanger}>{alert}</ToastDisplay>
		</div>
		
	</>
	)
}

export default CadUser