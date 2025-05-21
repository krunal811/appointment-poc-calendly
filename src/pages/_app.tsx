import '@fontsource/inter';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;