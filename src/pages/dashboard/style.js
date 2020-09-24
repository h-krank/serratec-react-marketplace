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
        background-color: green;
        color:white;
        margin-bottom: 20px;

        &:hover{
            background-color: darkgreen;
        }
    }

`