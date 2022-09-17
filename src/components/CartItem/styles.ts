import styled from "styled-components";

export const Item = styled.div`
  display: flex;
  max-width: 100%;
  width: 100%;
  margin-bottom: 2rem;
  background: #fff;
  border: 1px solid rgb(216, 216, 216);
  padding: 2rem;

  @media screen and (max-width: 1024px) {
    margin: 1rem;
    width: auto;

    @media screen and (max-width: 500px) {
      padding: 1.5rem;
      margin: 0;
      margin-top: 1rem;
    }
  }

  .item__image {
    @media screen and (max-width: 370px) {
      max-width: 100px;
    }

    img {
      @media screen and (max-width: 370px) {
        width: 100%;
      }
    }
  }

  .item__info {
    margin-left: 2rem;
    width: 100%;

    @media screen and (max-width: 500px) {
      margin-left: 1.5rem;
    }
  }

  .info__name {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 700;

    @media screen and (max-width: 500px) {
      font-size: 1rem;
    }
  }

  .info__genderAndColor {
    margin: 0;
    margin-top: 0.3rem;
  }

  .info__bottom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .info__price {
    color: #000;
    font-size: 1.1rem;
    margin-bottom: 0;
  }

  .info__quantityLabel {
    margin-top: 2rem;
    margin-bottom: 0;
  }

  .info__quantity {
    display: flex;
    align-items: center;
  }

  .quantity__num {
    font-size: 1.2rem;
  }

  .btn__remove {
    margin-left: 0;
  }

  .info__addBtn {
    width: fit-content;
    background: transparent;
    border: 0;
    font-size: 0.9rem;
    margin-top: 1rem;
    padding: 0.2rem;
    text-align: left;
    cursor: pointer;
    text-decoration: underline;
    transition: 0.2s ease;
  }

  .info__addBtn:hover {
    background: #EDE8F6;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  padding: 1rem 0;
  margin: 0 1rem;
  font-size: 2rem;
  font-weight: 100;
  background: transparent;
  border: 1px solid rgb(216, 216, 216);
  transition: 0.2s ease;
  cursor: pointer;

  &:hover {
    border: 1px solid #000;
    border-radius: 3px;
  }
`;
