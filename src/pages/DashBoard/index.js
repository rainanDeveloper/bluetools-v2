import React from 'react'
import './style.css'
import SupMenuAdmin from '../../components/SupMenuAdmin'

function DashBoard(){
    return (
        <>
            <SupMenuAdmin/>
            <div className="dashboard">
                <div className="clientesDash">
                    <h1>23</h1>
                    <h2>Clientes</h2>
                </div>
                <div className="contratosDash">
                    <h1>23</h1>
                    <h2>Contratos</h2>
                </div>
                <div className="recebimentosDash">
                    <h1>23</h1>
                    <h2>Recebimentos</h2>
                </div>
                <div className="pagamentosDash">
                    <h1>23</h1>
                    <h2>Pagamentos</h2>
                </div>
                <div className="graphDash">
                    
                </div>
            </div>
        </>
    )
}

export default DashBoard