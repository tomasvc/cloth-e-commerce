import styled from "styled-components";

export const List = styled.div`
  margin: auto;
  padding: 2rem 3rem 0 3rem;
  font-family: Montserrat, "Helvetica Neue", Helvetica, Arial;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 520px) {
    padding: 2rem 1rem 0 1rem;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  .product-list__filter {
    margin: 0 auto;
    display: flex;
  }

  .filter__item {
    min-width: 200px;
    padding: 0.5rem;
    margin-right: 1rem;
    outline: none;
    border: 1px solid #999;
  }

  .filter__item > option {
    appearance: none;
    padding: 1rem;
  }

  .product-list__list {
    max-width: 1300px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;
    padding: 0;
    margin: 1rem auto;

    @media screen and (max-width: 1024px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .product-list__not-found {
    font-size: 2rem;
    margin: auto;
  }

  .MuiPagination-ul li {
    padding: 0.5rem;
  }

  .MuiPagination-ul li:hover {
    background: transparent;
  }
`;
