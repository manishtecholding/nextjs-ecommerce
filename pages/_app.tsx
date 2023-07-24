import { createGlobalStyle, ThemeProvider } from 'styled-components';
import theme from '@/styles/theme';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: ${(props) => props.theme.colors.background};
  }
`;

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
