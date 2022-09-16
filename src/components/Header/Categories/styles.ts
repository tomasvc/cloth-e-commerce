import styled from "styled-components"

export const Menu = styled.div`

.categories {
    background: #525050;
    width: 100vw;
    margin-bottom: -1rem;
    position: relative;
    
    @media screen and (max-width: 1750px) {
        display: none;
    }
}

ul {
    display: flex;
    justify-content: start;
    margin-left: 4rem;

    @media screen and (max-width: 2000px) {
        justify-content: center;
        margin: 0;
    }
}

li {
    list-style-type: none;
    padding: 1rem;
    color: #fff;
    font-size: 0.8rem;
    user-select: none;
    cursor: pointer;

    @media screen and (max-width: 1750px) {
        display: none;
    }

    &:hover {
        background: #686565;
    }
}

`

