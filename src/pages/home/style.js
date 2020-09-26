import styled from 'styled-components';

export const Container = styled.div`
    display: grid;

`

export const Info = styled.div`
    a {
        text-decoration: none;
        color: black;

        :hover {
            opacity: 75%;
        }
    }

`

export const ProductSection = styled.div`
    display:grid;
    grid-template:  'item item item item';    
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
`

export const Product = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-right: 1px solid #ccc;
    height: 350px;
    width: 270px;
    justify-items: center;
    align-items: center;
    text-align: center;

    margin: 20px;   

    img{
        align-self: center;
        height: 250px;
        width: 250px;
        padding-top: 10px;
        padding-bottom: 5px;
        border-bottom: 1px solid #ccc;

    }
    
    p{
        font-family: sans-serif;
        font-size: 14px;
        font-weight: 300;
    }

    h3{
        justify-self: flex-end;        
    }

    &:hover{
            cursor:pointer;
        }


`