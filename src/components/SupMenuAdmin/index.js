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
                <li onMouseOver={event=>{
                    event.target.closest('li').classList.add('active')
                }} onMouseLeave={event=>{
                    event.target.closest('li').classList.remove('active')
                }}><Link to="#">Cadastros</Link>
                    <ul className="internalDropDown">
                        <li><Link to="/clientes">Clientes</Link></li>
                        <li><Link to="/usuarios">Contratos</Link></li>
                        <li><Link to="/usuarios">Fornecedores</Link></li>
                        <li><Link to="/usuarios">Usuários</Link></li>
                    </ul>
                </li>
                <li onMouseOver={event=>{
                    event.target.closest('li').classList.add('active')
                }} onMouseLeave={event=>{
                    event.target.closest('li').classList.remove('active')
                }}><Link to="#">Financeiro</Link>
                    <ul className="internalDropDown">
                        <li><Link to="/recebimentos">Recebimentos</Link></li>
                        <li><Link to="/recebimentos">Pagamentos</Link></li>
                    </ul>
                </li>
                <li><Link to="#" onClick={handleLogout}>Sair</Link></li>
            </ul>
        </div>
        </>
    )
}

export default SupMenuAdmin