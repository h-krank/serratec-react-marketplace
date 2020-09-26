import React, { useState, useEffect } from 'react';
import api from '../../../services/api'
import { FiDelete, FiEdit } from "react-icons/fi";


import { Produtos, Container, Form, CriarProduto } from './style'

const Produto = () => {
    //Produtos
    const [produtos, setProdutos] = useState([]);
    const [produtoId, setProdutoId] = useState('');
    const [produtoNome, setProdutoNome] = useState('');
    const [produtoDescricao, setProdutoDescricao] = useState('');
    const [produtoValor, setProdutoValor] = useState('');
    const [produtoEstoque, setProdutoEstoque] = useState('');
    const [produtoFabricacao, setProdutoFabricacao] = useState('');

    //Categorias
    const [categorias, setCategorias] = useState('')
    const [produtoCategoria, setCategoria] = useState('')

    //Funcionarios
    const [funcionarios, setFuncionarios] = useState('');
    const [funcionario, setFuncionario] = useState('');

    const [criarProduto, setCriarProduto] = useState(false);
    const [editarProduto, setEditarProduto] = useState(false);


    const loadProdutos = async () => {
        const response = await api.get('produto');
        setProdutos(response.data)
    }

    const loadCategorias = async () => {
        try {
            const response = await api.get('categoria');
            setCategorias(response.data)
            setCategoria(`${response.data[0].id},${response.data[0].nome}`)
        } catch (error) {
            console.log(error)
        }

    }

    const loadFuncionarios = async () => {
        try {
            const response = await api.get('funcionario')
            setFuncionarios(response.data);
            setFuncionario(`${response.data[0].id},${response.data[0].nome}`)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadProdutos();
        loadCategorias();
        loadFuncionarios();
    }, [])

    const removeItem = async (item) => {
        try {
            await api.delete(`produto/${item.id}`)
            loadProdutos();
        } catch (error) {
            console.log(error)
        }
    }

    const editItem = (item) => {
        setProdutoId(item.id);
        setProdutoNome(item.nome);
        setProdutoDescricao(item.descricao);
        setProdutoValor(item.valor);
        setProdutoEstoque(item.qtdEstoque);
        setProdutoFabricacao(item.dataFabricacao);
        setFuncionario(`${item.idFuncionario},${item.nomeFuncionario}`)

        setCriarProduto(true);
        setEditarProduto(true);
    }

    const handleCriarProduto = async (e) => {
        e.preventDefault()
        const categoriaSelecionada = produtoCategoria.split(',');
        const funcionarioSelecionado = funcionario.split(',');

        const params = {
            nome: produtoNome,
            descricao: produtoDescricao,
            qtdEstoque: produtoEstoque,
            valor: produtoValor,
            idCategoria: categoriaSelecionada[0],
            nomeCategoria: categoriaSelecionada[1],
            idFuncionario: funcionarioSelecionado[0],
            nomeFuncionario: funcionarioSelecionado[1],
            dataFabricacao: produtoFabricacao + "T00:00:00Z"
        }
        console.log(params, produtoId)

        try {
            if (editarProduto){
                await api.put(`produto/${produtoId}`, params)
            }else{
                await api.post('produto', params)
            }
            
        } catch (error) {
            
        }
        loadProdutos();

        //Clear fields
        setProdutoId('');
        setProdutoNome('');
        setProdutoDescricao('');
        setProdutoValor('');
        setProdutoEstoque('');
        setProdutoFabricacao('');

        //Closes box
        setEditarProduto(false);
        setCriarProduto(false);
    }

    return (
        <Container>
            <Form>
                <button onClick={() => {setCriarProduto(!criarProduto); setEditarProduto(false)}}>Administrar Produto</button>

                {criarProduto &&
                    <CriarProduto >
                        <form onSubmit={handleCriarProduto}>
                            <input
                                type="text"
                                value={produtoNome}
                                onChange={e => setProdutoNome(e.target.value)}
                                placeholder="Insira o nome do produto" />
                            <input
                                type="text"
                                value={produtoDescricao}
                                onChange={e => setProdutoDescricao(e.target.value)}
                                placeholder="Insira a descrição do produto" />

                            <input
                                type="text"
                                value={produtoValor}
                                onChange={e => setProdutoValor(e.target.value)}
                                placeholder="Insira o valor do produto" />

                            <input
                                type="text"
                                value={produtoEstoque}
                                onChange={e => setProdutoEstoque(e.target.value)}
                                placeholder="Insira a quantidade do estoque do produto" />

                            <input
                                type="text"
                                onFocus={(e) => e.target.type='date'}
                                onBlur={(e) => e.target.type='text'}
                                value={produtoFabricacao}
                                onChange={e => setProdutoFabricacao(e.target.value)}
                                placeholder="Insira a data de fabricação do produto" />

                            <select
                                onChange={e => setCategoria(e.target.value)}
                                value={produtoCategoria}>
                                <option value="" disabled>Selecione uma categoria</option>
                                {categorias.map(categoria => (
                                    <option
                                        key={categoria.id}
                                        value={[categoria.id, categoria.nome]}
                                    >
                                        {categoria.nome}
                                    </option>
                                    
                                ))}
                            </select>
                            {!editarProduto &&
                            <select
                                onChange={e => setFuncionario(e.target.value)}
                                value={funcionario} >
                                <option value="" disabled >Funcionário</option>
                                {funcionarios.map(funcionario => (
                                    <option
                                        key={funcionario.id}
                                        value={[funcionario.id, funcionario.nome]}
                                    >
                                        {funcionario.nome}
                                    </option>
                                ))}
                            </select>
                            }

                            <button type='submit'>Enviar</button>
                        </form>
                    </CriarProduto>}
            </Form>

            {produtos.map(produto => (
                <Produtos key={produto.id}>
                    {produto.nome} - {produto.descricao} | Valor: R${produto.valor} | Estoque: {produto.qtdEstoque}
                    <div>
                        <FiEdit size='20px' onClick={() => editItem(produto)}/>
                        <FiDelete size='20px' onClick={() => removeItem(produto)} />
                    </div>
                </Produtos>
            ))}
        </Container>
    )

}

export default Produto;