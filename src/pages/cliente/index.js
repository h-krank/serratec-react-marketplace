import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import { Container } from './style'


const Cliente = () => {
    const [nome, setNome] = useState();
    const [usuario, setUsuario] = useState();
    const [cpf, setCpf] = useState();
    const [email, setEmail] = useState();
    const [alterCliente, setAlterarCliente] = useState(false);
    const [user] = useState(JSON.parse(localStorage.getItem('@AMAZONIA:user')))



    const definirEstados = useCallback(
        () => {

        setNome(user.nome);
        setUsuario(user.usuario);
        setCpf(user.cpf);
        setEmail(user.email);

    }, [user.nome, user.usuario, user.cpf, user.email])
    useEffect(() => {
        definirEstados();
    }, [definirEstados]);


    async function alterarCliente(e) {
        e.preventDefault();

        try {
            const params = {
                nome: nome,
                usuario: usuario,
                cpf: cpf,
                email: email,
                dataNascimento: "1992-02-01T00:00:00Z",
                endereco: {
                    rua: "Rua dos Bobos",
                    numero: "0",
                    complemento: "",
                    bairro: "Castanheira",
                    cidade: "Metropolis",
                    estado: "SP",
                    cep: "23451234"
                }

            }

            console.log(params)
            await api.put(`cliente/${user.id}`, params)
            localStorage.setItem('@AMAZONIA:user', JSON.stringify(params));

        } catch (error) {
            console.log("Erro ao alterar o cliente", error)
        }
    }


    return (

        <Container>


            {!alterCliente &&
                <div>

                    <p>Nome: {nome}</p>
                    <p>Usuário: {usuario}</p>
                    <p>Cpf: {cpf}</p>
                    <p>Email: {email}</p>

                    <button type="submit" onClick={e => setAlterarCliente(!alterCliente)}> Alterar</button>

                </div>
            }

            {alterCliente &&

                <form onSubmit={(e) => {
                    setAlterarCliente(!alterCliente);
                    alterarCliente(e);

                }
                }>


                    <label>Nome </label>
                    <input type="text" value={nome} onChange={e => setNome(e.target.value)} />

                    <label> Usuario </label>
                    <input type="text" value={usuario} onChange={e => setUsuario(e.target.value)} />

                    <label> Cpf </label>
                    <input type="text" value={cpf} onChange={e => setCpf(e.target.value)} />

                    <label> Email </label>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />

                    <button type="submit"> Alterar </button>


                </form>

            }

        </Container>

    )

}

export default Cliente;
