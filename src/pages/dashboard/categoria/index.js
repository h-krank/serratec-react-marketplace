import React, { useState, useEffect } from 'react';
import api from '../../../services/api'
import { FiDelete, FiEdit } from "react-icons/fi";


import { Categorias, Container, Form, CriarCategoria } from './style'

const Categoria = () => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaNome, setCategoriaNome] = useState();
    const [categoriaDescricao, setCategoriaDescricao] = useState();

    const [criarCategoria, setCriarCategoria] = useState(false);

    const loadCategorias = async () => {
        const response = await api.get('categoria');
        setCategorias(response.data)
    }

    useEffect(() => {
        loadCategorias();
    }, [])

    const removeItem = async (item) => {
        await api.delete(`categoria/${item.id}`)
        loadCategorias();
    }
    
    const handleCriarCategoria = async (e) => {
        e.preventDefault()

        const params = {
            nome: categoriaNome,
            descricao: categoriaDescricao
        }
        await api.post('categoria', params)
        loadCategorias();
    }

    return (
        <Container>
            <Form>
                <button onClick={() => setCriarCategoria(!criarCategoria)}>Criar Nova Categoria</button>

                {criarCategoria &&
                    <CriarCategoria >
                        <form onSubmit={handleCriarCategoria}>
                            <input
                                type="text"
                                value={categoriaNome}
                                onChange={e => setCategoriaNome(e.target.value)}
                                placeholder="Insira o nome da categoria" />
                            <input
                                type="text"
                                value={categoriaDescricao}
                                onChange={e => setCategoriaDescricao(e.target.value)}
                                placeholder="Insira a descrição da categoria" />

                            <button type='submit'>Enviar</button>
                        </form>
                    </CriarCategoria>}
            </Form>

            {categorias.map(categoria => (
                <Categorias key={categoria.id}>
                    {categoria.nome} - {categoria.descricao}
                    <div>
                        <FiEdit size='20px' />
                        <FiDelete size='20px' onClick={() => removeItem(categoria)} />
                    </div>
                </Categorias>
            ))}
        </Container>
    )

}

export default Categoria;