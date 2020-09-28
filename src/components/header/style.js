import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    margin-bottom: 40px;
    border-bottom: 1px solid #ccc;
    background-color: #131921;

    img{
        width: 150px;
        margin: 5px;

    }

    form {
        display: flex;
        margin-top: 10px;
        
        input {
            padding: 10px;
            margin-left: 200px;
            width: 500px;
            height: 40px;
            border-radius: 5px 0px 0px 5px;
            border: 1px solid #ccc;
            color: #333;
        }

        button {
            width: 50px;
            height: 40px;
            background-color: #fff;
            color: black;
            border: 1px solid #febd69;
            border-left: none;
            border-radius: 0px 5px 5px 0px;
            background-color: #febd69;

            &:hover {
                opacity: .75;
            }
        }
    }

    ul{
        display:flex;
        list-style: none;
        margin: 10px;
        margin-left: auto;
        margin-top: auto;
    }
    li {
        font-size: 14px;

        & + li {
            margin-left: 15px;
        }
    }

    a{
        color: #333;
        text-decoration: none;

        &:hover{
            color: #04d361;
        }
    }
`
export const Title = styled.h1`
    font-size: 36px;
    color: #3a3a3a;
`;