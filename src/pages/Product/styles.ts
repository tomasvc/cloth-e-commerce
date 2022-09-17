import styled from "styled-components";

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;

  a {
    color: #000;
    text-decoration: none;
  }

  .product {
    display: flex;
    width: 70%;
    margin: 2rem auto;
    font-family: Montserrat, "Helvetica Neue", Helvetica, Arial;

    @media screen and (max-width: 1024px) {
      flex-direction: column;
      margin: 2rem auto;

      @media screen and (max-width: 520px) {
        margin: 0;
        padding: 2rem;
        width: 100%;
      }
    }
  }

  .product__left {
    display: flex;

    @media screen and (max-width: 768px) {
      flex-direction: column-reverse;
    }
  }

  .left__imageList {
    display: flex;
    flex-direction: column;
    margin: 0 0.5rem;

    @media screen and (max-width: 768px) {
      margin: 1rem 0;
      max-height: 100px;
      height: 100%;
      flex-direction: row;
      justify-content: center;
    }
  }

  .left__imageList > img {
    margin-bottom: 0.5rem;
    object-fit: cover;

    @media screen and (max-width: 768px) {
      margin: 0.2rem;
      width: 23.5%;
      height: auto;
    }
  }

  .left__imageList > img:hover {
    cursor: pointer;
  }

  .left__image {
    min-width: 450px;
    width: 100%;

    @media screen and (max-width: 1024px) {
      min-width: auto;
    }
  }

  .product__right {
    padding-top: 1rem;
    margin-left: 3rem;

    @media screen and (max-width: 1024px) {
      margin-left: 4.1rem;

      @media screen and (max-width: 768px) {
        margin-left: 0.2rem;
      }
    }
  }

  .right__category {
    text-transform: uppercase;
    font-size: 0.7rem;
    letter-spacing: 1px;
    margin: 0;
  }

  .right__title {
    font-size: 1.5rem;
    font-weight: 400;
    margin: 0.2rem 0 1rem 0;
  }

  .right__description ul {
    display: flex;
    flex-direction: column;
    list-style-type: circle;
    margin-left: 0;
    padding-left: 0;
  }

  .right__description ul li {
    list-style-type: none;
    background: transparent;
    color: #000;
    padding: 0;
    cursor: default;
  }

  .info__price {
    font-size: 1.3rem;
    font-weight: 600;
    color: #444;
  }

  .info__rate {
    padding-left: 1rem;
    padding-right: 0.5rem;
  }

  .info__count {
    color: #666;
  }

  .right__heading {
    margin-top: 1rem;
    font-size: 0.8rem;
  }

  .right__heading > span {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
  }

  .right__description {
    line-height: 1.5rem;
    margin-top: 1rem;
  }

  .right__buttons {
    display: flex;
    margin-top: 2rem;
  }

  .buttons__addToCart {
    padding: 0.7rem 0.5rem;
    width: 10rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    color: #fff;
    background-color: #000;
    border: 1px solid #000;
    transition: 0.3s ease;
  }

  .buttons__addToCart:hover {
    cursor: pointer;
    color: #000;
    background-color: #fff;
  }

  .buttons__favorite {
    font-size: 2rem;
    background: #eeeeee;
    border: none;
    border-radius: 50px;
    padding: 0.5rem;
    min-height: 40px;
    margin-left: 1rem;
    display: flex;
    align-items: center;
  }

  .buttons__favorite:hover {
    cursor: pointer;
  }

  .product__suggestions {
    font-family: Montserrat, "Helvetica Neue", Helvetica, Arial;
    margin: 0 2rem;
    margin-top: 2rem;
  }

  .suggestions__items {
    display: flex;
  }

  .items__item {
    max-width: 30%;
  }
`;
