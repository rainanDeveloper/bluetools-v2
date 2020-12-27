import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import './style.css'


function SupMenuAdmin(){
	const history = useHistory()

	const authToken = localStorage.getItem('authToken')

	if(!authToken){
		history.push('/')
	}

	function handleLogout(){
		localStorage.clear()
		history.push('/')
	}

	return (
		<>
		<div className="supMenu">
			<ul>
				<li><Link to="#">Cadastros</Link>
					<ul className="internalDropDown">
						<li><Link to="/pais">País</Link></li>
						<li><Link to="/ufs">UF</Link></li>
						<li><Link to="/cidades">Cidade</Link></li>
						<li><Link to="/clientes">Cliente</Link></li>
						<li><Link to="/contratos">Contrato</Link></li>
						<li><Link to="/fornecedores">Fornecedor</Link></li>
					</ul>
				</li>
				<li><Link to="#">Gerencial</Link>
					<ul className="internalDropDown">
						<li><Link to="/usuarios">Usuários</Link></li>
						<li><Link to="#">Configuração</Link></li>
					</ul>
				</li>
				<li><Link to="#">Financeiro</Link>
					<ul className="internalDropDown">
						<li><Link to="/recebimentos">Recebimentos</Link></li>
						<li><Link to="/pagamentos">Pagamentos</Link></li>
					</ul>
				</li>
				<li><Link to="/dashboard">Dashboard</Link></li>
				<li><Link to="#" onClick={handleLogout}>Sair</Link></li>
			</ul>
		</div>
		</>
	)
}

export default SupMenuAdmin