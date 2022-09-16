import styled from "styled-components";

export const StyledLogin = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100vw;
    height: calc(100vh - 56px);

    @media screen and (max-width: 870px) {
        flex-direction: column-reverse;
        margin-bottom: 2rem;
    }

  .login__left {
    display: flex;
    flex-basis: 50%;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .login__right {
    flex-basis: 50%;
    overflow: hidden;
  }

  .right__image {
    transform: translateY(-200);
    object-fit: contain;
    width: 100%;
  }

  .login__title {
    font-size: 2rem;
    font-weight: 200;
  }

  .login__form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: Montserrat, "Helvetica Neue", Helvet;
  }

  .form__label {
    text-transform: uppercase;
    font-size: 0.7rem;
    margin-bottom: 0.3rem;
  }

  .form__input {
    padding: 0.7rem 0.5rem;
    width: 20rem;
    margin-bottom: 0.8rem;
    border: 1px solid #666;
    outline: none;
    background-color: transparent;
  }

  .form__submit {
    padding: 0.7rem 0.5rem;
    margin: 0.5rem 0;
    background: #000;
    color: #fff;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    border: none;
    position: relative;
    border: 1px solid #000;
    transition: 0.3s ease;
  }

  .form__submit:hover {
    cursor: pointer;
    color: #000;
    background-color: transparent;
  }

  .login__registerLink {
    font-family: Montserrat, "Helvetica Neue", Helvetica, Arial;
    font-size: 0.9rem;
  }

  .login__googleBtn {
    margin-top: 1rem;
    padding: 0.7rem;
    min-width: 200px;
    max-width: 30%;
    width: 100%;
    background: rgb(234, 234, 234);
    border: 1px solid rgb(186, 186, 186);
    cursor: pointer;
  }
`;
