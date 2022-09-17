import styled from "styled-components"

export const StyledHeader = styled.div`

  width: 100vw;
  max-height: 4rem;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: -1rem;
  background: rgb(21, 20, 20);

.header__navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5rem;
  width: 100%;

  @media screen and (max-width: 1024px) {
    padding: 0;
  }
}
.navbar__left {
  display: flex;
  align-items: center;
  height: inherit;
  padding: 0 2rem;

  @media screen and (max-width: 768px) {
    padding: 0;
    padding-left: 1rem;
  }
}
.left__bars {
  display: none;
  color: #fff;
  width: 25px;
  height: 25px;
  margin-top: 0.2rem;
  margin-right: 1rem;
  cursor: pointer;

  @media screen and (max-width: 1750px) {
    display: block;
  }
}
.navbar__right {
  align-items: center;
  position: relative;
  display: flex;

  @media screen and (max-width: 768px) {
    margin-right: 1rem;
  }
}
.right__cart,
.right__user {
  align-items: center;
  position: relative;
  color: #fff;
}
.right__user {
  display: flex;
  flex-direction: row;
}
.navbar__right > button {
  background-color: transparent;
  border: none;
  margin-left: 1rem;
  font-size: 1.2rem;
}
.cart__cart,
.user__user {
  left: -180px;
  top: 40px;
  transition: 0.3s ease;
}
.user__login {
  color: #fff;
  font-size: 0.9rem;  
  margin-right: 1rem;

  @media screen and (max-width: 400px) {
    display: none;
  }
}
.navbar__right > button:hover {
  cursor: pointer;
}
.cart__login {
  text-transform: uppercase;
  font-size: 0.8rem;
}
.navbar__icon {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 18px;
  position: relative;
  margin-right: 1rem;
}
.navbar__icon:hover {
  cursor: pointer;
}
.navbar__icon > span {
  width: 30px;
  height: 0.5px;
  background: #fff;
}
.navbar__icon:active > span {
  animation: icon--1__rotate;
}
.navbar__icon--1 {
  transform: rotate(45deg);
  transform: translateX(5);
}
.navbar__icon--2 {
  transform: rotate(45deg);
}
.navbar__icon--3 {
  transform: rotate(-45deg);
  transform: translateX(-10);
}
.menu {
  display: none;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 10;
}
.menu--visible {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  z-index: 10;
}
.menu__item {
  width: 30%;
  margin: 1rem auto;
  text-decoration: none;
  font-size: 3rem;
  position: relative;
}
.menu__item:hover {
  text-decoration: line-through;
}
.brand__name {
  font-size: 1.4rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fff;
}


`
