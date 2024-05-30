import { render, screen } from "@testing-library/react";
import Title from "./Title";
import { BookStoreThemeProvider } from "../../context/themeContext";
import { ThemeProvider } from "styled-components";
import { getTheme } from "../../style/theme";
import Button from "./Button";

describe("Button 컴포넌트 테스트", () => {
  it("렌더를 확인", () => {
    //1. 렌더
    render(
      <BookStoreThemeProvider>
        <Button size="large" schema="primary">
          버튼
        </Button>
      </BookStoreThemeProvider>
    );
    //2. 확인
    expect(screen.getByText("버튼")).toBeInTheDocument();
  });

  it("size props 적용",()=> {
    const {container} = render(
        <BookStoreThemeProvider>
            <Button size = "large" schema="primary">제목</Button>
        </BookStoreThemeProvider>
    );
    
    expect(screen.getByRole("button")).toHaveStyle({fontSize: "2rem"});
  })
  it("scheam props 적용",()=> {
    const {container} = render(
        <BookStoreThemeProvider>
            <Button size = "large" schema="primary">제목</Button>
        </BookStoreThemeProvider>
    );
    
    expect(screen.getByRole("button")).toHaveStyle({color: "white"});
  })
});
