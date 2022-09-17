import styled from "styled-components"

export const StyledProfile = styled.div`

    background: #fafafa;
    min-width: 40vh;
    height: 100vh;
    padding: 8rem;
    position: relative;
    top: 1rem;

    @media screen and (max-width: 1024px) {
        padding: 4rem;

        @media screen and (max-width: 768px) {
            padding: 2rem;
        }
    }

    .profile__info {
        background: #fff;
        border: 1px solid rgb(216, 216, 216);
        padding: 2rem;
        max-width: 500px;

        .info__greeting {
            margin: 0;
        }

        .info__links {
            display: flex;
            flex-direction: column;
            margin: 2rem 0;

            & > * {
                text-decoration: underline;
                margin-bottom: 0.5rem;
            }
        }
    }

`