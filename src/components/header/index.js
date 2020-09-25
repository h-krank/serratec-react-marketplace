import React from 'react';
import {Link} from 'react-router-dom'
import logoImg from '../../assets/amazonia.jpg'
import { Container, Title } from './style'

const Header = ({ title }) => {
    return (
        <>
            <Container>
                <Link to="/search"><img src={logoImg} alt="logo" /></Link>
                <ul>
                    <li>
                            <Link to='/cart'>Carrinho</Link>
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