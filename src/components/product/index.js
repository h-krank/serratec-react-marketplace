import React from 'react'
import {Link} from 'react-router-dom'

import {Produto, Info} from './style'

const Product = ({product}) => {
    
    function convertPrice(value) {
        return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      }

    return (
        <Produto>
            <Link to={`/product/${product.id}`}>
                <img
                    src={product.fotoLink}
                    alt={product.nome}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png"
                    }}>
                </img>
            </Link>

            <Info>
                <Link to={`/product/${product.id}`}>
                    <p className="nome">{product.nome} - {product.descricao}</p>
                </Link>
                <p className="categoria">{product.nomeCategoria}</p>
                <h3>{convertPrice(product.valor)}</h3>
            </Info>

        </Produto>



    )
}

export default Product;