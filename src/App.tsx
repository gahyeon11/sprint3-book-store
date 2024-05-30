import Layout from "./components/layout/Layout";
import { GlobalStyle } from "./style/global";
import { ThemeProvider } from "styled-components";
import { ThemeName, getTheme } from "./style/theme";
import ThemeSwicher from "./components/header/ThemeSwicher";
import { useContext, useState } from "react";
import { BookStoreThemeProvider, ThemeContext } from "./context/themeContext";
import Home from "./pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Router } from "express";
import Error from "./components/common/Error";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Home /></Layout>,
    errorElement:<Layout> <Error /></Layout>
  },
  {
    path: "/books",
    element: <Layout><div>도서 목록</div></Layout>,
  },
  {
    path: "/signup",
    element: <Layout>
      <SignUp/>
    </Layout>
  },
  {
    path: "*",
    element: <Layout><div>404</div></Layout>
  }
])

function App() {
  return (
    <BookStoreThemeProvider>
        <RouterProvider router={router}/>
    </BookStoreThemeProvider>
  );
}

export default App;
