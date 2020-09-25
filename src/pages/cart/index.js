import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Container, Product, Info } from './style'

const Cart = () => {
    const [carrinho, setCarrinho] = useState([]);

    const handleCarrinho = () => {
        let cart = [];
        let local = JSON.parse(localStorage.getItem('@AMAZONIA:cart'));

        
        var rep = [...new Set(local)]


        setCarrinho(rep)

    }

    useEffect(() => {
        handleCarrinho();
    }, [])

    return (
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
                        <h3>R${product.valor}</h3>
                    </Info>

                </Product>
            ))}
        </Container>
    )
}

export default Cart;