import styled from 'styled-components';

export const Container = styled.div``
export const Filter = styled.div``
export const Price = styled.div``

export const Info = styled.div``



export const ProductSection = styled.div`
    display:flex;
    flex-wrap: wrap;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
`

export const Product = styled.div`
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    height: 280px;
    width: 230px;
    padding: 10px;
    margin-bottom: 20px;   

    img{
        align-self: center;
        height: 200px;
        width: 200px;

    }
    
    p{
        font-family: sans-serif;
        font-size: 14px;
        font-weight: 300;
    }

    h3{
        margin-top: 10px;
        margin-right: auto;
    }

    &:hover{
            cursor:pointer;
        }

`