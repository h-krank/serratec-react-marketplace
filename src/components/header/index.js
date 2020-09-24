import React from 'react';
import logoImg from '../../assets/logo.jpeg'
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