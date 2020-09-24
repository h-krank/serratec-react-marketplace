import React from 'react';
import { Link } from 'react-router-dom'
import {Container} from './style'

const Dashboard = () => {

    return (
        <Container>
            
            <Link to="dashboard/produto">
                <button>Administrar Produtos</button>
            </Link>

            <Link to="dashboard/categoria">
                <button>Administrar Categorias</button>
            </Link>

            <Link to="dashboard/funcionario">
                <button>Administrar Funcionario</button>
            </Link>


        </Container>

    )

}

export default Dashboard