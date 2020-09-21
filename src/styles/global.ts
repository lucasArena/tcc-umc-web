import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    background: ${(props) => props.theme.colors.background};
  }

  :root {
    font-size: 60%;
  }

  #root {
    display: flex;
    justify-content: center;
  }

  body, input, button, textarea {
    font: 500 1.6rem Poppins;
    color: ${(props) => props.theme.colors.textBase};
  }

  @media (min-width: 700px) {
    :root {
        font-size: 62.5%;
    }
  }
`;
