import React, { useState } from 'react';
import api from '../../services/api'

import { Form, Address } from './style'


const Login = () => {
    const [name, setName] = useState('');
    const [user, setUser] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [nascimento, setNascimento] = useState('');

    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [cep, setCep] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Fix date format "1992-02-01T00:00:00Z" ok (ghetto fix)
        //Give user feedback about wrong fields
        //Save to localStorage
        //Make pretty
        const cliente = {
            "nome": name,
            "usuario": user,
            "cpf": cpf,
            "email": email,
            "dataNascimento": nascimento + "T00:00:00Z",
            "endereco": {
                "rua": rua,
                "numero": numero,
                "complemento": complemento,
                "bairro": bairro,
                "cidade": cidade,
                "estado": estado,
                "cep": cep
            }
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

                <label htmlFor={'nascimento'}>Data de Nascimento</label>
                <input
                    type="date"
                    id='date'
                    value={nascimento}
                    onChange={e => setNascimento(e.target.value)} />

                <Address>
                    <label htmlFor={'rua'}>Rua</label>
                    <input
                        type="text"
                        id='rua'
                        value={rua}
                        onChange={e => setRua(e.target.value)} />

                    <label htmlFor={'numero'}>Número</label>
                    <input
                        type="text"
                        id='numero'
                        value={numero}
                        onChange={e => setNumero(e.target.value)} />

                    <label htmlFor={'cpf'}>Complemento</label>
                    <input
                        type="text"
                        id='complemento'
                        value={complemento}
                        onChange={e => setComplemento(e.target.value)} />

                    <label htmlFor={'bairro'}>Bairro</label>
                    <input
                        type="text"
                        id='bairro'
                        value={bairro}
                        onChange={e => setBairro(e.target.value)} />


                    <label htmlFor={'cidade'}>Cidade</label>
                    <input
                        type="text"
                        id='cidade'
                        value={cidade}
                        onChange={e => setCidade(e.target.value)} />

                    <label htmlFor={'estado'}>Estado</label>
                    <input
                        type="text"
                        id='estado'
                        value={estado}
                        onChange={e => setEstado(e.target.value)} />


                    <label htmlFor={'cep'}>CEP</label>
                    <input
                        type="text"
                        id='cep'
                        value={cep}
                        onChange={e => setCep(e.target.value)} />
                </Address>


                <button type="submit">Enviar</button>
            </form>
        </Form>
    )

}

export default Login;



