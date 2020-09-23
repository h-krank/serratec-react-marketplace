import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
`
export const Filter = styled.div`
    display: flex;
    flex-direction: column;
    width: 20%;
    border-right: 1px solid #ccc;
    margin: 10px;

    h4{
        margin-top: 15px;
        margin-bottom: 5px;
    }

    label{
        margin-left: 5px;
    }
`
export const Price = styled.div`
    display: flex;
    gap: 10px;
    input {
        width: 30%;
        
    }
`
export const ProductSection = styled.div`
    display:flex;
    flex-direction: column;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
`

export const Product = styled.div `
    display: flex;
    padding: 10px;

    img{
        width: 150px;
        height: 150px;
        
        &:hover{
            cursor: pointer;
            opacity: .8;
        }
            
    }

    & + div {
        border-top: 1px solid #ccc;
    }
`

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    
    p {
        margin-top: 5px;
        
    }
    .nome{
        
        &:hover{
            cursor: pointer;
            color: #aaa;
        }
    }
    .categoria{
        font-size: 12px;   
    }

    h3{ 
        margin-top: auto;
    }
`