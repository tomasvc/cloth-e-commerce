import styled from "styled-components"

export const Item = styled.div`


    list-style-type: none;
    text-align: center;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;


.item__top {
    display: flex;
    justify-content: center;
    align-items: center;
}

.item__info {
    height: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 1.5rem;

    @media screen and (max-width: 1024px) {
        max-width: 70%;
        margin: auto;
        margin-bottom: 2rem;
    }
}

.top__image {
    width: 100%;
}

.top__image:hover {
    cursor: pointer;
}

.info__title {
    transition: 0.2s ease;
}

.info__title:hover {
    cursor: pointer;
    opacity: 0.7;
}

.bottom__price {
    font-size: 1.3rem;
    margin: 0;
    margin-bottom: 0.5rem;
}

`

