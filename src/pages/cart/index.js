import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiChevronUp, FiChevronDown, FiShoppingCart } from 'react-icons/fi'

import { Container, CartInfo, Item, Empty } from './style'

import Product from '../../components/product'

const Cart = () => {
    const [carrinho, setCarrinho] = useState(['']);

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

    const addQtd = (id) => {
        const newCart = carrinho.map(product => {

            if (product.id === id && product.qtd < product.qtdEstoque) {
                product.qtd++
            }
            return product
        })
        setCarrinho(newCart)
        localStorage.setItem('@AMAZONIA:cart', JSON.stringify(newCart))
    }

    const removeQtd = (id) => {
        const newCart = carrinho.map(product => {

            if (product.id === id && product.qtd > 1) {
                product.qtd--
            }
            return product
        })
        setCarrinho(newCart)
        localStorage.setItem('@AMAZONIA:cart', JSON.stringify(newCart))
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
                            <div className='item-right'>
                                <FiX onClick={e => removeItem(product.id)} />
                                <div className="product-qtd">
                                    <div>
                                        <FiChevronUp size='12px' onClick={() => addQtd(product.id)} />
                                        <FiChevronDown size='12px' onClick={() => removeQtd(product.id)} />

                                    </div>

                                    <h4>x{product.qtd}</h4>

                                </div>
                            </div>
                        </Item>
                        <hr style={{ color: '#eee' }} />
                    </>

                ))}
                <CartInfo>
                    <h4>Total:{loadCartInfo()}</h4>
                    <Link to={{
                        pathname: '/checkout',
                        state: {
                            finished: true
                        }
                    }}><button>Finalizar compra</button>
                    </Link>
                </CartInfo>

            </Container>
            : <Empty>
                <FiShoppingCart size="200"/>
                <p>Carrinho vazio</p>
                <Link to='/home'><button>Voltar para loja</button></Link>
            </Empty>
    )
}

export default Cart;