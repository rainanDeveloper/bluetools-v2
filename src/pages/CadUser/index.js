import React, {useState, useEffect} from 'react'
import HtmlTable from '../../components/HtmlTable'
import SupMenuAdmin from '../../components/SupMenuAdmin'
import { cpfMask } from '../../functions/Masks'

import api from '../../services/api'

function CadUser(){
	
	const [users, setUsers] = useState([])
	const [q, setQ] =  useState('')

	const auth = localStorage.getItem('authToken')

	useEffect(()=>{
		api.get('/user/', {
			headers: {
				auth
			}
		})
		.then(({data})=>{
			setUsers(data)
		})
	}, [])
	
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
			/>
		</div>
		
	</>
	)
}

export default CadUser