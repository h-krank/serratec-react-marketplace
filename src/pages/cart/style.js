import styled from 'styled-components';

export const Container = styled.div `
    width: 50%; 
    margin-left:auto;
    margin-right: auto;
    svg {
        margin: 5px;
        margin-left: auto;

        :hover{
            cursor: pointer;
        }
    }

`

export const Item = styled.div`
    display: flex;
    
    svg {
        margin: 10px;
        margin-left: auto;

        :hover{
            cursor: pointer;
        }
    }
`



export const Product = styled.div `
    display: flex;
    padding: 10px;

    img{
        width: 75px;
        height: 75px;
        
        &:hover{
            cursor: pointer;
            opacity: .8;
        }
            
    }

    & + div {
        border-top: 1px solid #ccc;
    }

    a {
        text-decoration: none;
        color: black;

        :hover {
            opacity: 75%;
        }
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

export const CartInfo = styled.div`
    display: flex;
    h4{
        margin-top: 20px;
    }

    a{
        margin: 10px;
        margin-left: auto;
    }
`