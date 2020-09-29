import styled from 'styled-components'

export const Container = styled.div`
    display:flex;
    width: 70%;
    flex-direction: column;
    margin-left:auto;
    margin-right:auto;
    margin: 200px;
    
    button {
        width: 20%;
        height: 30px;
        border: 0;
        margin-top: 20px;
        margin-bottom: 20px;
        background-color: #fff;
        color:#fd9304;
        border: 1px solid #fd9304;
        border-radius: 5px;

        &:hover{
            /* opacity: 70%; */
            background-color:#FEBD69;
            color: #fff;
            

        }
    }

`