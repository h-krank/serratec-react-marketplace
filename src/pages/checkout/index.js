import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { FiCheckCircle } from 'react-icons/fi'
import api from '../../services/api'

import { Container } from './style'

const Checkout = (props) => {
    const history = useHistory();
    const [cart, setCart] = useState([]);
    const [compraFinalizada, setCompraFinalizada] = useState(false);
    let checkout = false;

    try {
        props.location.state.finished = true;
        checkout = true;
    } catch (error) {

        history.push('/home')
    }

    const updateProducts = useCallback(
        () => {
            if (checkout) {


                cart.map(async (product) => {
                    await api.put(`produto/${product.id}`, {
                        "nome": product.nome,
                        "descricao": product.descricao,
                        "qtdEstoque": product.qtdEstoque - product.qtd,
                        "valor": product.valor,
                        "idCategoria": product.idCategoria,
                        "nomeCategoria": product.nomeCategoria,
                        "idFuncionario": product.idFuncionario,
                        "nomeFuncionario": product.nomeFuncionario,
                    })
                })
                localStorage.removeItem("@AMAZONIA:cart")
                setCompraFinalizada(true);
            }
        }, [cart, checkout])

    const getCart = useCallback(
        () => {
            setCart(JSON.parse(localStorage.getItem("@AMAZONIA:cart")));

        }, [])


    useEffect(() => {
        getCart();
    }, [getCart])

    useEffect(() => {
        updateProducts()
    }, [cart, updateProducts])


    return (
        compraFinalizada ?
            <Container>
                <FiCheckCircle size='200px' />
                <h1>Compra finalizada com sucesso!</h1>
            </Container>
            : <> </>
    )
}

export default Checkout