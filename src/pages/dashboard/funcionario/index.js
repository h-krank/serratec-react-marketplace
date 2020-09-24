import React, { useState, useEffect } from 'react';
import api from '../../../services/api'
import { FiDelete, FiEdit } from "react-icons/fi";


import { Funcionarios, Container, Form, CriarFuncionario} from './style'

const Funcionario = () => {
    const [funcionarios, setFuncionarios] = useState([]);
    const [funcionarioNome, setFuncionarioNome] = useState();
    const [funcionarioCpf, setFuncionarioCpf] = useState();

    const [criarFuncionario, setCriarFuncionario] = useState(false);

    const loadFuncionarios = async () => {
        const response = await api.get('funcionario');
        setFuncionarios(response.data)
    }

    useEffect(() => {
        loadFuncionarios();
    }, [])

    const removeItem = async (item) => {
        await api.delete(`funcionario/${item.id}`)
        loadFuncionarios();
    }
    
    const handleCriarFuncionario = async (e) => {
        e.preventDefault()

        const params = {
            nome: funcionarioNome,
            cpf: funcionarioCpf
        }
        await api.post('funcionario', params)
        loadFuncionarios();
    }

    return (
        <Container>
            <Form>
                <button onClick={() => setCriarFuncionario(!criarFuncionario)}>Criar Novo Funcionario</button>

                {criarFuncionario &&
                    <CriarFuncionario >
                        <form onSubmit={handleCriarFuncionario}>
                            <input
                                type="text"
                                value={funcionarioNome}
                                onChange={e => setFuncionarioNome(e.target.value)}
                                placeholder="Insira o nome do funcionario" />
                            <input
                                type="text"
                                value={funcionarioCpf}
                                onChange={e => setFuncionarioCpf(e.target.value)}
                                placeholder="Insira o CPF do funcionario" />

                            <button type='submit'>Enviar</button>
                        </form>
                    </CriarFuncionario>}
            </Form>

            {funcionarios.map(funcionario => (
                <Funcionarios key={funcionario.id}>
                    {funcionario.nome} - {funcionario.cpf}
                    <div>
                        <FiEdit size='20px' />
                        <FiDelete size='20px' onClick={() => removeItem(funcionario)} />
                    </div>
                </Funcionarios>
            ))}
        </Container>
    )

}

export default Funcionario;