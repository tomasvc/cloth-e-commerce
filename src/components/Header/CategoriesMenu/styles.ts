import styled from "styled-components"

type MenuProps = {
    readonly visibility: string;
}

export const Menu = styled.div<MenuProps>`
    width: 100vw;
    display: flex;
    visibility: ${props => props.visibility};
    position: absolute;
    top: -15px;
    z-index: 10;
    background: ${props => props.visibility === 'visible' ? '#00000099' : 'transparent'};
    transition: 0.3s ease;

    .categories__ul {
        display: flex;
        flex-direction: column;
        position: relative;
        left: ${props => props.visibility === 'visible' ? '0' : '-350px'};
        margin-left: 0;
        padding-left: 0;
        background: #525050;
        max-width: 300px;
        max-height: 100vh;
        overflow-Y: auto;
        width: 100%;
        transition: 0.3s ease;

        .ul__category {
            padding: 2rem;
            color: #fff;
            cursor: pointer;
            transition: 0.3s all;

            &:hover {
                background: #666;
            }
        }
    }

    .categories__closeBtn {
        position: relative;
        top: 25px;
        left: ${props => props.visibility === 'visible' ? '0' : '-350px'};
        color: #fff;
        width: 50px;
        height: 50px;
        margin-left: 0.2rem;
        transition: 0.3s ease;
        cursor: pointer;
    }

`