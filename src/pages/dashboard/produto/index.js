import React, { useState, useEffect } from 'react';
import api from '../../../services/api'
import { FiDelete, FiEdit } from "react-icons/fi";


import { Produtos, Container, Form, CriarProduto } from './style'

const Produto = () => {
    const [produtos, setProdutos] = useState([]);
    const [produtoNome, setProdutoNome] = useState('');
    const [produtoDescricao, setProdutoDescricao] = useState('');
    const [produtoValor, setProdutoValor] = useState('');
    const [produtoEstoque, setProdutoEstoque] = useState('');

    const [categorias, setCategorias] = useState([])
    const [produtoCategoria, setCategoria] = useState('')




    const [criarProduto, setCriarProduto] = useState(false);

    const loadProdutos = async () => {
        const response = await api.get('produto');
        setProdutos(response.data)
    }

    const loadCategorias = async () => {
        const response = await api.get('categoria')
        setCategorias(response.data)
    }

    useEffect(() => {
        loadProdutos();
        loadCategorias();
    }, [])

    const removeItem = async (item) => {
        await api.delete(`produto/${item.id}`)
        loadProdutos();
    }

    const handleCriarProduto = async (e) => {
        e.preventDefault()
        
        const params = {
            nome: produtoNome,
            descricao: produtoDescricao,
            qtdEstoque: produtoEstoque,
            valor: produtoValor,
            idCategoria: produtoCategoria.id,
            nomeCategoria: produtoCategoria.nome,
            nomeFuncionario: "Joaquim Manoel",
            dataFabricacao: "2019-10-01T00:00:00Z",
            fotoLink: "http://residencia-ecommerce.us-east-1.elasticbeanstalk.com/produto/1/foto"
        }
        console.log(params)
        await api.post('produto', params)
        loadProdutos();
    }

    return (
        <Container>
            <Form>
                <button onClick={() => setCriarProduto(!criarProduto)}>Criar Novo Produto</button>

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

                            <select 
                                onChange={e => setCategoria(e.target.value)}
                                value={produtoCategoria}>
                                {categorias.map(categoria => (
                                    <option 
                                        key={categoria.id}
                                        value={produtoCategoria}
                                        >
                                        {categoria.nome}
                                    </option>
                                ))}
                            </select>


                            <button type='submit'>Enviar</button>
                        </form>
                    </CriarProduto>}
            </Form>

            {produtos.map(produto => (
                <Produtos key={produto.id}>
                    {produto.nome} - {produto.descricao} | Valor: R${produto.valor} | Estoque: {produto.qtdEstoque}
                    <div>
                        <FiEdit size='20px' />
                        <FiDelete size='20px' onClick={() => removeItem(produto)} />
                    </div>
                </Produtos>
            ))}
        </Container>
    )

}

export default Produto;