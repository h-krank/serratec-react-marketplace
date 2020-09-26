import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi'

import { Container, Product, Info, CartInfo } from './style'

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
                    <Product key={product.id}>
                        <Link to={`/product/${product.id}`}>
                            <img src={product.fotoLink}
                                alt={product.nome}
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png" }}>
                            </img>
                        </Link>

                        <Info>
                            <Link to={`/product/${product.id}`}><p className="nome">{product.nome} - {product.descricao}</p></Link>
                            <p className="categoria">{product.nomeCategoria}</p>
                            <h5>x{product.qtd}</h5>
                            <h3>{convertPrice(product.valor)}</h3>
                        </Info>
                        <FiX onClick={e => removeItem(product.id)} />

                    </Product>
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