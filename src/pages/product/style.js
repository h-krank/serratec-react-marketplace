import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    width: 70%;
    margin-left:auto;
    margin-right:auto;

    background-color:#eee;

    img {
        width: 200px;
        height: 200px;
    }
`


export const Produto = styled.div `
    display: flex;
    padding: 10px;

    img{
        width: 300px;
        height: 300px;       
    }

    button {
        height: 50px;
        
    }
`

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;    
    
    p {
        margin-top: 5px;
        
    }

    .categoria{
        font-size: 12px;   
    }

    h3{ 
        margin-top: auto;
    }

`

export const Compra = styled.div`
    display: flex;
    flex-direction:column;
    margin: 10px;
    margin-left: auto;
    min-width:30%;
    
    button{
        margin: 5px;
    }
    
    #parcela{
        margin-top: 5px;
        margin-bottom: auto;
    }

    #qtdProduto{
        width: 60px;
        margin-left: 5px;
    }
    
    
`
