import styled from "styled-components"

export const Menu = styled.div`

.categories {
    background: #525050;
    width: 100vw;
    
    @media screen and (max-width: 1750px) {
        display: none;
    }
}

ul {
    display: flex;
    justify-content: center;
    background: #525050;
    margin: 0;

    @media screen and (max-width: 1750px) {
        display: none;
    }
}

li {
    list-style-type: none;
    padding: 1rem;
    color: #fff;
    font-size: 0.8rem;
    user-select: none;
    cursor: pointer;
    background: #525050;

    @media screen and (max-width: 1750px) {
        display: none;
    }

    &:hover {
        background: #686565;
    }
}

`

