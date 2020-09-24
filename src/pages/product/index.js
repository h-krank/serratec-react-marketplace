import React, {useEffect, useState} from 'react';
import { Container, Produto, Info, Compra } from './style'

import api from '../../services/api'

const Product = () => {
    const [product, setProduct] = useState('');
    const [notFound, setNotFound] = useState(false);
    const link = window.location.href;
    let id = link.split('/').pop();

    const loadInfo = async () => {
        try {
            const response = await api.get(`produto/${id.length ? id : '0'}`)

            setProduct(response.data);
        } catch (error) {
            console.log(error)
            setNotFound(true);
        }
    }

    useEffect(() => {
        loadInfo();
      }, [])


    return (
        notFound ? "Produto não encontrado :(" :
        <Container>
            <Produto key={product.id}>
                <img src={product.fotoLink}
                    alt={product.nome}
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png" }}>
                </img>
                <Info>
                    <p className="nome">{product.nome} - {product.descricao}</p>
                    <p className="categoria">{product.nomeCategoria}</p>
                    <h3>R${product.valor}</h3>
                </Info>
            </Produto>
            <Compra>
                <p id='parcela'>
                    12x sem juros de <strong>R${(product.valor / 12).toFixed(2)}</strong>
                </p>
                <p>Quantidade em estoque: {product.qtdEstoque ? product.qtdEstoque : 'Indisponivel'}</p>
                <button>Comprar</button>
                <button>Adicionar ao carrinho</button>
            </Compra>
        </Container>
    )

}

export default Product;