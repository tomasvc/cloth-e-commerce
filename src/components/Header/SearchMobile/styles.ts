import styled from "styled-components";

export const Searchbar = styled.div`
  @media screen and (max-width: 870px) {
    display: none;
  }

  .left__input {
    min-width: 500px;
    width: 100%;
    margin-left: 1rem;
  }
  .input {
    background-color: #fafafa;
    border: 1px solid lightgrey;
    border-radius: 50px;
    outline: none;
    padding: 0.5rem;
    width: 100%;
    font-size: 0.8rem;
    padding: 0.6rem 0.7rem 0.5rem 0.7rem;
    position: relative;
  }
  .input:focus {
    background-color: #fff;
    border: 1px solid #999;
  }
  .input::placeholder {
    color: #999;
  }
  #results {
    background: #fafafa;
    padding: 1rem;
    position: absolute;
    top: 3rem;
    width: 500px;
    z-index: 10;
  }
  #results ul {
    flex-direction: column;
    padding-left: 0;
    margin: 0;
  }
  #results ul li {
    list-style-type: none;
    cursor: pointer;
    padding: 0.5rem;
    color: #000;
  }
  #results ul li:hover {
    background: #ececec;
  }
`;
