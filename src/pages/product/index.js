import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Container, Compra } from './style'
import Product from '../../components/product'

import api from '../../services/api'
import Header from '../../components/header'

const ProductPage = () => {
    const [product, setProduct] = useState('');
    const [qtdProduto, setQtdProduto] = useState(1);
    const [notFound, setNotFound] = useState(false);
    const link = window.location.href;
    let id = link.split('/').pop();

    const loadInfo = useCallback(
        async () => {
            try {
                const response = await api.get(`produto/${id.length ? id : '0'}`)
                setProduct(response.data);
            } catch (error) {
                console.log(error)
                setNotFound(true);
            }
        }, [id])

    useEffect(() => {
        loadInfo();
    }, [loadInfo])


    const addToCart = () => {
        let cart = []
        if (localStorage.getItem('@AMAZONIA:cart')) {
            cart = JSON.parse(localStorage.getItem('@AMAZONIA:cart'))
        }
        cart = cart.filter(item => item.id !== product.id)
        cart.push({ ...product, qtd: qtdProduto })

        localStorage.setItem('@AMAZONIA:cart', JSON.stringify(cart))
    }

    const inCart = (id) => {
        let cart = JSON.parse(localStorage.getItem('@AMAZONIA:cart'));

        if (!cart)
            cart = []

        return (cart.some(product => product.id === id))
    }

    function convertPrice(value) {
        return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    return (
        <>
        <Header />
            {notFound ? <span style={{ margin: '20px' }}>Produto não encontrado :(</span> :
            <Container>
                <Product product={product} />

                <Compra>
                    <p id='parcela'>
                        12x sem juros de <strong>{convertPrice(product.valor / 12)}</strong>
                    </p>

                    <p style={{ fontSize: '10px' }}>{inCart(product.id) ? 'Produto já adicionado' : ''}</p>
                    <div>
                        <Link to='/cart'>
                            <button disabled={product.qtdEstoque < 1} onClick={addToCart}>
                                {inCart(product.id) ? 'Atualizar Carrinho' : 'Adicionar ao carrinho'}
                            </button>
                        </Link>
                        <input
                            id='qtdProduto'
                            type='number'
                            value={qtdProduto}
                            min='1'
                            max={product.qtdEstoque}
                            disabled={product.qtdEstoque < 1}
                            onChange={e => setQtdProduto(e.target.value)}
                            placeholder='qtd' />
                        <p>Quantidade em estoque: {product.qtdEstoque > 0 ? product.qtdEstoque : 'Indisponivel'}</p>
                    </div>
                </Compra>
            </Container>}
        </>
    )

}

export default ProductPage;