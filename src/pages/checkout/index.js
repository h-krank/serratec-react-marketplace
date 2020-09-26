import React from 'react'
import { FiCheckCircle } from 'react-icons/fi'

import { Container } from './style'

const Checkout = () => {
    localStorage.removeItem("@AMAZONIA:cart")

    return (
        <Container>
            <FiCheckCircle size='200px'/>
            <h1>Compra finalizada com sucesso!</h1>
        </Container>
    )
}

export default Checkout