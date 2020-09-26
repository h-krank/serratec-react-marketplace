import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom'
import logoImg from '../../assets/amazonia.jpg'
import { Container, Title } from './style'
import { FiSearch } from 'react-icons/fi';


const Header = ({ title }) => {
    const history = useHistory();
    const [query, setQuery] = useState('');

    return (
        <>
            <Container>
                <Link to="/home"><img src={logoImg} alt="logo" /></Link>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setQuery('');
                    history.push(`/search?q=${query.split(' ').join('&')}`)
                    }}>
                    <input 
                        type="text" 
                        value={query}
                        onChange={e => setQuery(e.target.value)}/>
                    <button><FiSearch/></button>
                </form>

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