import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      background: string;
      primary: string;
      primaryLight: string;
      primaryLighter: string;
      primaryDark: string;
      primaryDarker: string;
      secundary: string;
      secundaryDark: string;
      titlePrimary: string;
      textPrimary: string;
      textTitle: string;
      textComplement: string;
      textBase: string;
      lineWhite: string;
      inputBackground: string;
      buttonText: string;
      deleteButtonText: string;
      buttonDisabled: string;
      boxBase: string;
      boxFooter: string;
    };
  }
}
