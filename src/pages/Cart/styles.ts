import styled from "styled-components";

export const StyledCart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
  padding: 2rem 0;
  background: #fafafa;

  .cart__label {
    font-size: 3rem;
  }

  .cart__wrapper {
    display: flex;
    justify-content: center;
    margin-top: 1rem;

    @media screen and (max-width: 1024px) {
      flex-direction: column-reverse;
    }
  }

  .cart__items {
    max-width: 100%;
  }

  .cart__title {
    font-size: 2rem;
    font-weight: 200;
  }

  .cart__summary {
    border: 1px solid rgb(216, 216, 216);
    background: #fff;
    margin-left: 3rem;
    padding: 2rem;
    max-height: 335px;

    @media screen and (max-width: 1024px) {
      margin: 1rem;
      margin-bottom: 2rem;
    }
  }

  .summary__label {
    margin-top: 0;
    font-size: 1.2rem;
  }

  .summary__total {
    display: flex;
    justify-content: space-between;
  }

  .total__price {
    font-weight: 600;
    margin-left: 4rem;
  }

  .summary__buttons {
    display: flex;
    flex-direction: column;
  }

  .buttons__shopBtn {
    padding: 0.7rem 1.2rem;
    margin: 0.5rem 0;
    padding: 1rem;
    padding-top: 1.2rem;
    background: #000;
    color: #fff;
    letter-spacing: 0.1rem;
    /* text-transform: uppercase; */
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    border: none;
    position: relative;
    /* border: 1px solid #000; */
    transition: 0.3s ease;
  }

  .buttons__shopBtn:hover {
    cursor: pointer;
    color: #000;
    background-color: rgb(194, 166, 76);
  }

  .buttons__continueBtn {
    margin: auto;
    background: transparent;
    border: none;
    padding: 0.2rem;
    margin-top: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
    text-decoration: underline;
    cursor: pointer;
    transition: 0.2s ease;
  }

  .buttons__continueBtn:hover {
    background: #ede8f6;
  }

  .summary__payments {
    display: flex;
    justify-content: space-around;
    margin-top: 1.5rem;
  }
`;
