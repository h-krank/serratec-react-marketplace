import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { FiCheckCircle } from 'react-icons/fi'
import api from '../../services/api'

import { Container } from './style'

const Checkout = (props) => {
    const history = useHistory();
    const [cart, setCart] = useState([]);
    const [compraFinalizada, setCompraFinalizada] = useState(false);

    const user = JSON.parse(localStorage.getItem('@AMAZONIA:user'))
    let checkout = false;

    try {
        props.location.state.finished = true;
        checkout = true;
    } catch (error) {
        history.push('/home')
    }

    const getCart = useCallback(
        () => {
            setCart(JSON.parse(localStorage.getItem("@AMAZONIA:cart")));

        }, [])

    const updateProducts = useCallback(

        async () => {

            try {
                console.log(user.nome)
            } catch (error) {
                history.push('/')
                return;
            }
            
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
        }, [cart, checkout, history])


    const getData = useCallback(
        async () => {
            if (compraFinalizada) {

                await api.post('/pedido', {
                    'dataPedido': '2020-08-30T20:10:10Z',
                    'pedidoStatus': 'AGUARDANDO_PAGAMENTO',
                    'idCliente': user.id,
                    'nomeCliente': user.nome
                })
            }
        }, [compraFinalizada])

    useEffect(() => {
        getData();
    }, [compraFinalizada, getData])

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
            : <>

            </>
    )
}

export default Checkout