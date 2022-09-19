import styled from "styled-components";

export const Homepage = styled.div`
  width: 100vw;
  height: calc(100vh - 56px);
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1024px) {
    display: block;
  }

  .home__left {
    position: relative;
    display: flex;
    flex-basis: 50%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fafafa;

    @media screen and (max-width: 1024px) {
      width: 100%;
      max-height: 70%;
      text-align: center;
      display: block;
      position: absolute;
      background-color: transparent;
      color: #fafafa;
      bottom: 20rem;

      @media screen and (max-width: 768px) {
        bottom: 12rem;
      }
    }


  }

  .left__greeting {
    font-weight: 200;
    font-size: 2.5rem;

    @media screen and (max-width: 1024px) {
      font-size: 1.5rem;
    }
  }

  .left__button {
    background: none;
    border: 1px solid #000;
    padding: 0.7rem 2rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    position: relative;
    z-index: 1;
    transition: 0.3s ease;

    @media screen and (max-width: 1024px) {
      border-color: #fafafa;
      color: #fafafa;
    }
  }

  .left__button::after {
    content: "";
    position: absolute;
    left: -1px;
    top: -1px;
    height: 2.5rem;
    width: 1px;
    background: #000;
    transition: 0.3s ease;
    z-index: -1;

    @media screen and (max-width: 1024px) {
      background: transparent;
    }
  }

  .left__button:hover {
    cursor: pointer;
    color: #fff;
  }

  .left__button:hover::after {
    width: 101%;
  }

  .home__right {
    flex-basis: 50%;
    overflow: hidden;

    @media screen and (max-width: 1024px) {
      height: 100%;
    }
  }

  .right__image {
    width: 100%;
    height: auto;
    object-fit: cover;

    @media screen and (max-width: 1200px) {
      height: 100%;
    }
  }
`;
