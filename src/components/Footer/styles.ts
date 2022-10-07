import styled from "styled-components";

export const StyledFooter = styled.footer`
    font-size: 0.8rem;
    overflow-x: hidden;
    position: relative;
    z-index: 10;

    @media screen and (max-width: 768px) {
      display: none;
    }

  .footer__top {
    padding: 0.5rem 5rem 1rem 5rem;
    margin: auto;
    display: flex;
    background-color: #eeeeee;

    @media screen and (max-width: 768px) {
        display: none;
    }
  }

  .top__column {
    margin-right: 10rem;

    @media screen and (max-width: 1024px) {
        margin-right: 5rem;
    }
  }

  .top__column > h4 {
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #555;
    font-size: 0.85rem;
  }

  .top__column > p {
    color: #444;
  }

  .top__column > p:hover {
    cursor: pointer;
  }

  .footer__bottom {
    padding: 0 5rem;
    margin: auto;
    display: flex;
    justify-content: space-between;
    background-color: #dddddd;
    color: #444;

    @media screen and (max-width: 768px) {
        padding: 0 1rem;

        @media screen and (max-width: 600px) {
            justify-content: center;
        }
    }
  }

  .footer__bottom > div {
    display: flex;

    @media screen and (max-width: 600px) {
        display: none;
    }
  }

  .footer__bottom > div > p {
    padding: 0 1rem;
  }

  .footer__bottom > div > p:hover {
    cursor: pointer;
  }

  .footer__bottom > div > p:not(:last-child) {
    border-right: 1px solid #444;
  }
`;
