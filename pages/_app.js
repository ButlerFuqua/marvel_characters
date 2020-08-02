import App from 'next/app'
import { ThemeProvider } from 'styled-components'


const theme = {
    colors: {
        primary: '#A055BF',
        dim: '#81618e',
        light: '#e7b7ff',
        medium: '#393C49',
        dark: '#131417'
    },
}


export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props
        return (
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />

                <style jsx global>{`
                    html,
                    body {
                    padding: 0;
                    margin: 0;
                    font-size: 16px;
                    color: white;
                    font-family: 'Arial';
                    background: ${theme.colors.dark};
                    }


                    * {
                    box-sizing: border-box;
                    }

                `}</style>

            </ThemeProvider>

        )
    }
}

