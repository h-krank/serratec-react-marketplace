import React, { useState } from 'react';
import api from '../../services/api'

import { Form, Address } from './style'


const Login = () => {
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
            
        }
        console.log(cliente)

        try {
            await api.post('cliente', cliente);
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



