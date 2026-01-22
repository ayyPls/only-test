import { DefaultTheme } from 'styled-components';

interface IAppTheme {
  color: {
    text: {
      primary: string,
      secondary: string
      hightlightPrimary: string
      hightlightSecondary: string
    }
  },
  circleRadius: number,
  circleItemSize:number,
  border: string
  fonts: {
    primary: string,
    secondary: string
  },
  fontSize: {
    "2xl": string
    xl: string
  }
}

const AppTheme: DefaultTheme = {
    color: {
      text: {
        hightlightPrimary: "#5D5FEF",
        hightlightSecondary: "#EF5DA8",
        primary: "#42567A",
        secondary: "#3877EE"
      },
    },
    circleRadius: 530,
    circleItemSize: 56,
    border: "1px solid #E3E6ED",
    fonts: {
      primary: `"PT Sans", "Arial", sans-serif`,
      secondary: `"Bebas Neue", sans-serif`
    },
    fontSize: {
      "2xl": "200px",
      xl: "3rem"
    }
}


declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends IAppTheme {}
}

export { AppTheme }