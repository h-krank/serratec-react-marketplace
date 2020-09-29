import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import logoImg from '../../assets/amazonia-white.png'
import { Container } from './style'
import { FiSearch, FiUser } from 'react-icons/fi';
import { MdShoppingCart } from 'react-icons/md'
import { ImExit } from 'react-icons/im'



const Header = () => {
    const history = useHistory();
    const [query, setQuery] = useState('');

    const getUser = () => {
        let user = JSON.parse(localStorage.getItem('@AMAZONIA:user'))
        return user
    }

    return (
        <>
            <Container>
                <Link to="/home"><img src={logoImg} alt="logo" /></Link>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    history.push({
                        pathname: '/search',
                        search: query.split(' ').join('&')
                    })
                    setQuery('');
                }}>
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)} />
                    <button><FiSearch /></button>
                </form>

                <ul>
                    {getUser() ?
                        <li>
                            <Link to='/cliente'>
                                <div>
                                    <p>Bem vindo: {getUser().nome}</p> 
                                    <FiUser size='13' />

                                </div>
                            </Link>
                        </li> : <></>}
                    <li>
                    <Link to='/cart'> <MdShoppingCart /></Link>
                </li>
                {getUser() ?
                    <li onClick={() => localStorage.removeItem("@AMAZONIA:user")}>
                        <Link to='/'><ImExit /></Link>
                    </li> :
                    <li>
                        <Link to='/'><FiUser /></Link>
                    </li>}

                </ul>

        </Container>
        </>
    )


}

export default Header;