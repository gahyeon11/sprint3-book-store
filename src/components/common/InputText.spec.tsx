import { render, screen } from "@testing-library/react";
import Title from "./Title";
import { BookStoreThemeProvider } from "../../context/themeContext";
import { ThemeProvider } from "styled-components";
import { getTheme } from "../../style/theme";
import InputText from "./InputText";
import React from "react";

describe("InputText 컴포넌트 테스트", () => {
  it("렌더를 확인", () => {
    //1. 렌더
    render(
      <BookStoreThemeProvider>
        <InputText placeholder="여기에 입력하세요"/>
      </BookStoreThemeProvider>
    );
    //2. 확인
    expect(screen.getByPlaceholderText("여기에 입력하세요")).toBeInTheDocument();
  });

  it("forwardRef 테스트", ()=>{
    const ref = React.createRef<HTMLInputElement>();
    render(
        <BookStoreThemeProvider>
        <InputText placeholder="여기에 입력하세요" ref = {ref}/>
      </BookStoreThemeProvider>
    );

    expect (ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
