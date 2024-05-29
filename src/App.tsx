import Detail from "./components/common/Detail";
import Layout from "./components/layout/Layout";
import { GlobalStyle } from "./style/global";
import { ThemeProvider } from "styled-components";
import { ThemeName, getTheme } from "./style/theme";
import ThemeSwicher from "./components/header/ThemeSwicher";
import { useContext, useState } from "react";
import { BookStoreThemeProvider, ThemeContext } from "./context/themeContext";

function App() {
  return (
    <BookStoreThemeProvider>
      <ThemeSwicher  />
      <Layout>
        <Detail />
      </Layout>
    </BookStoreThemeProvider>
  );
}

export default App;
