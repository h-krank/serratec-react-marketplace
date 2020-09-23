import React from 'react';
import { Link } from 'react-router-dom'
import logoImg from '../../assets/todo.jpg'
import { Container, Title } from './style'

const Header = ({ title }) => {
    return (
        <>
            <Container>
                <img src={logoImg} alt="logo" />
                <ul>
                    <li>                      
                            Carrinho
                    </li>
                    <li>                        
                            Sair            
                    </li>

                </ul>
            
            </Container>
            <Title>{title}</Title>
        </>
    )


}

export default Header;