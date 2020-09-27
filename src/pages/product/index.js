import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Container, Info, Compra } from './style'
import Product from '../../components/product'

import api from '../../services/api'

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


    return (
        notFound ? "Produto não encontrado :(" :
            <Container>
                <Product product={product}/>
                
                <Compra>
                    <p id='parcela'>
                        12x sem juros de <strong>R${(product.valor / 12).toFixed(2)}</strong>
                    </p>
                    <p>Quantidade em estoque: {product.qtdEstoque ? product.qtdEstoque : 'Indisponivel'}</p>
                    <div>
                        <Link to='/cart'>
                            <button onClick={addToCart}>
                                Adicionar ao carrinho
                        </button>
                        </Link>
                        <input
                            id='qtdProduto'
                            type='number'
                            value={qtdProduto}
                            min='1'
                            max={product.qtdEstoque}
                            onChange={e => setQtdProduto(e.target.value)}
                            placeholder='qtd' />
                    </div>

                </Compra>
            </Container>
    )

}

export default ProductPage;