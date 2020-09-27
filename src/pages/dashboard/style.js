import styled from 'styled-components'

export const Container = styled.div`
    display:flex;
    width: 70%;
    flex-direction: column;
    margin-left:auto;
    margin-right:auto;

    
    button {
        width: 100%;
        height: 50px;
        border: 0;
        margin-bottom: 20px;
        background-color: #fff;
        color:#fd9304;
        border: 1px solid #fd9304;

        &:hover{
            opacity: 70%;
        }
    }

`