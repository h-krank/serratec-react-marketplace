import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { FiX, FiChevronUp, FiChevronDown, FiShoppingCart } from 'react-icons/fi'

// import { Container, CartInfo, Item, Empty } from './style'



const Cliente = () => {
    const[idCliente, setIdCliente] = useState();
    const [cliente, setCliente] = useState([]);
    const [newNome, setNewNome] = useState();
    const [usuario, setUsuario] = useState();
    const [cpf, setCpf] = useState();
    const [email, setEmail] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [rua, setRua] = useState();
    const [numero, setNumero] = useState();
    const [complemento, setComplemento] = useState();
    const [bairro, setBairro] = useState();
    const [cidade, setCidade] = useState();
    const [estado, setEstado] = useState();
    const [cep, setCep] = useState();
    

    const handleCliente = () => {
        let cliente = JSON.parse(localStorage.getItem('@AMAZONIA:cliente'));
        setCliente(cliente);

    }


//    -Adicionar página do cliente exibindo suas informações e possibilitando alterá-las



// async function alterarCliente (e) {
//     e.preventDefault();
    
//     try {
//         const params = {
//             nome: cliente.nome,
//             usuario: cliente.usuario,
//             cpf: cliente.cpf, 
//             email: cliente.email,
//             dataNascimento: cliente.dataNascimento,
//             endereco: cliente.endereco

//     }

//         // console.log(params)
//         await api.put(`cliente/${idCliente}`, params)
        
//     } catch (error) {
//         console.log("Erro ao alterar o cliente", error)
//     }
// }


useEffect(() => {
//    buscarCliente();
}, []);


return(
    <h1>Ola Mundo!</h1>
)

}

export default Cliente;
