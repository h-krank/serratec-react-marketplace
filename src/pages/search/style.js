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
export const PriceActive = styled.div`
    display: flex;

    div {
        margin-left: auto;
        margin-right: 5px;
        display: flex;
        :hover{
            cursor: pointer;
        }
        
    
        span{
            margin-top: 2px;
            font-size: 12px;
    
        }

    }

`

export const ProductSection = styled.div`
    display:flex;
    flex-direction: column;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    

    a {
        text-decoration: none;
        color: black;
    }
`

export const Blur = styled.div`
    display: flex;
    flex-direction: column;
    
    #unavailable{
        margin-left: auto;
        font-size: 10px;
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