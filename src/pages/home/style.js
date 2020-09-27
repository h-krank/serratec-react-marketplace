import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
`

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    

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

export const Produto = styled.div`
    display: flex;
    flex-direction: column;
    height: 350px;
    width: 250px;
    justify-items: center;
    align-items: center;
    text-align: center;
    border: 1px solid #ccc;
    border-top: 0;
    

    margin: 20px;   

    img{
        align-self: center;
        height: 250px;
        width: 250px;
        color: black;
        border: 1px solid #ccc;

    }
    
    p{
        font-family: sans-serif;
        font-size: 14px;
        font-weight: 300;
    }

    h3{
        width: 100%;
        padding: 10px;
        
        
        margin-top: auto;    

        :hover{
            opacity: .9;
        }
        
    }

    &:hover{
        cursor:pointer;
    }
    
`