import styled from 'styled-components';

export const Produto = styled.div `
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

    a {
        text-decoration: none;
        color: #333;
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