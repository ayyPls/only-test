import styled from "styled-components";


const PageHeading = styled.h1`
    position: absolute;
    top: 170px;
    display: flex;
    margin: 0;
    font-size: ${({theme}) => theme.fontSize.xl};
    color: ${({theme}) => theme.color.text.primary};
    line-height: 120%;
    white-space: pre-line;
    width: fit-content;
    z-index: 2;

    &::before {
      content: "";
      border: 2px solid;
      border-image: linear-gradient(
        to bottom,
        ${({theme}) => theme.color.text.hightlightPrimary},
        ${({theme}) => theme.color.text.hightlightSecondary}
      ) 1;
      margin: 7px 80px 7px 0;
    }
    @media screen and (max-width: 768px) {
      font-size: 20px;
      position: inherit;
      
      &::before {
        display: none;
      }
    }
`

export { PageHeading }
