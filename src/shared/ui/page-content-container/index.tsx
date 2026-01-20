import styled from "styled-components";


const PageContentContainer = styled.div`
    position: relative;
    min-height: 100vh;
    display: flex;
    padding-top: 215px;
    flex-direction: column;
    @media screen and (max-width: 768px) {
        min-height: inherit;
        padding-top: 0;
    }
`

export { PageContentContainer }