import styled from "styled-components";


const PageHeading = styled.h1`
    position: absolute;
    top: 170px;
    display: flex;
    margin: 0;
    font-size: 56px;
    color: #42567A;
    line-height: 120%;
    white-space: pre-line;
    width: fit-content;

    &::before {
      content: "";
      border: 2px solid;
      border-image: linear-gradient(to bottom, #3877EE, #EF5DA8) 1;
      margin: 7px 80px 7px 0;
    }
`

export { PageHeading }
