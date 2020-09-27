import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi'

import { Container, Info, CartInfo, Item } from './style'

import Product from '../../components/product'

const Cart = () => {
    const [carrinho, setCarrinho] = useState([]);

    const handleCarrinho = () => {
        let cart = JSON.parse(localStorage.getItem('@AMAZONIA:cart'));

        //Sets cart to localStorage data if available or to an empty list if empty
        setCarrinho(cart ? cart : [])
    }

    const loadCartInfo = () => {
        let prices = carrinho.map(product => product.valor * product.qtd);
        let total = 0;

        if (prices.length > 0)
            total = prices.reduce((x, y) => x + y)

        return convertPrice(total)
    }

    function convertPrice(value) {
        return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    const removeItem = (id) => {
        const newCart = carrinho.filter(product => product.id !== id);
        localStorage.setItem('@AMAZONIA:cart', JSON.stringify(newCart))
        handleCarrinho();
    }


    useEffect(() => {
        handleCarrinho();
    }, [])

    return (
        carrinho.length > 0 ?
            <Container>
                {carrinho.map(product => (
                    <>
                        <Item>
                            <Product key={product.id} product={product} />
                            <FiX onClick={e => removeItem(product.id)} />
                        </Item>
                        <hr style={{ color: '#eee' }} />
                    </>

                ))}
                <CartInfo>
                    <h4>Total:{loadCartInfo()}</h4>
                    <Link to="/checkout"><button>Finalizar compra</button></Link>
                </CartInfo>

            </Container>
            : <p>Carrinho está vazio</p>
    )
}

export default Cart;