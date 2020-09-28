import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import api from '../../services/api'

import { Form, Address } from './style'


const Login = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [user, setUser] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        const cliente = {
            "nome": name,
            "usuario": user,
            "cpf": cpf,
            "email": email,
            "dataNascimento": "1992-02-01T00:00:00Z",
            "endereco": {
                "rua": "Rua dos Bobos",
                "numero": "0",
                "complemento": "",
                "bairro": "Castanheira",
                "cidade": "Metropolis",
                "estado": "SP",
                "cep": "23451234"
            }
        }

        console.log(JSON.stringify(cliente))

        try {
            await api.post('cliente', cliente);
            localStorage.setItem('@AMAZONIA:user', JSON.stringify(cliente));
            history.push('/home');
        } catch (error) {
            console.log('handleSubmitError', error)
        }
    }




    return (
        <Form>
            <form onSubmit={handleSubmit}>
                <label htmlFor={'name'}>Nome</label>
                <input
                    type="text"
                    id='name'
                    value={name}
                    onChange={e => setName(e.target.value)} />

                <label htmlFor={'user'}>Usuário</label>
                <input
                    type="text"
                    id='user'
                    value={user}
                    onChange={e => setUser(e.target.value)} />

                <label htmlFor={'cpf'}>CPF</label>
                <input
                    type="text"
                    id='cpf'
                    value={cpf}
                    onChange={e => setCpf(e.target.value)} />

                <label htmlFor={'email'}>Email</label>
                <input
                    type="email"
                    id='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)} />





                <button type="submit">Enviar</button>
            </form>
        </Form>
    )

}

export default Login;



