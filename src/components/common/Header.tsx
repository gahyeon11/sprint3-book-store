import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.jpg";
import {
  FaSignInAlt,
  FaRegUser,
  FaUserCircle,
  FaBars,
  FaAngleRight,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCategory } from "../../hooks/useCategory";
import { useAuthStore } from "../../store/authStore";
import Dropdown from "./Dropdown";
import ThemeSwitcher from "../header/ThemeSwicher";
import InputText from "../../components/common/InputText";
import { fetchBooks } from "../../api/books.api";
import { Book } from "../../models/book.model";

function Header() {
  const { category } = useCategory();
  const { isLoggedIn, storeLogout } = useAuthStore();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<Book[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const results = await fetchBooks({ title: searchQuery, limit: 22 });
      setSearchResults(results.books);
      const book = results.books.find((b) => b.title === searchQuery);
      console.log(results.books)
      console.log(searchQuery)
      if (book) {
        navigate(`/book/${book.id}`);
      } else {
        alert("검색 결과가 없습니다.");
      }
    }
  };

  return (
    <HeaderStyle $isOpen={isMobileOpen}>
      <h1 className="logo">
        <Link to="/">
          <img src={logo} alt="book store" />
        </Link>
      </h1>

      <form className="form" onSubmit={handleSearchSubmit}>
        <InputText
          placeholder="책 제목을 입력하세요"
          inputType="text"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit">검색</button>
      </form>


      <nav className="category">
        <button
          className="menu-button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <FaAngleRight /> : <FaBars />}
        </button>
        <ul>
          {category.map((item) => (
            <li key={item.id}>
              <Link
                to={
                  item.id === null ? "/books" : `/books?categoryId=${item.id}`
                }
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="auth">
        <Dropdown toggleButton={<FaUserCircle />}>
          <>
            {isLoggedIn ? (
              <ul>
                <li>
                  <Link to="/cart">장바구니</Link>
                </li>
                <li>
                  <Link to="/orderlist">주문 내역</Link>
                </li>
                <li>
                  <button onClick={storeLogout}>로그아웃</button>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <Link to="/login">
                    <FaSignInAlt />
                    로그인
                  </Link>
                </li>
                <li>
                  <Link to="/signup">
                    <FaRegUser />
                    회원가입
                  </Link>
                </li>
              </ul>
            )}
            <ThemeSwitcher />
          </>
        </Dropdown>
      </nav>
    </HeaderStyle>
  );
}

interface HeaderStyleProps {
  $isOpen: boolean;
}

const HeaderStyle = styled.header<HeaderStyleProps>`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.background};

  .logo {
    img {
      height: 50px;
    }
  }

  form {
    display: flex;
    align-items: center;

    input {
      padding: 0.5rem;
      margin-right: 0.5rem;
      border: 1px solid ${({ theme }) => theme.color.border};
      border-radius: ${({ theme }) => theme.borderRadius.default};
    }

    button {
      padding: 0.5rem 1rem;
      background-color: ${({ theme }) => theme.color.primary};
      color: white;
      border: none;
      border-radius: ${({ theme }) => theme.borderRadius.default};
      cursor: pointer;

      &:hover {
        background-color: ${({ theme }) => theme.color.primaryDark};
      }
    }
  }

  .category {
    .menu-button {
      display: none;
    }

    ul {
      display: flex;
      gap: 32px;
      li {
        a {
          font-size: 1.2rem;
          font-weight: 600;
          text-decoration: none;
          color: ${({ theme }) => theme.color.primary};

          &:hover {
            color: ${({ theme }) => theme.color.third};
          }
        }
      }
    }
  }

  .auth {
    ul {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100px;

      li {
        a,
        button {
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          line-height: 1;
          background: none;
          border: 0;
          cursor: pointer;

          svg {
            margin-right: 6px;
          }
        }
      }
    }
  }

  @media screen AND ${({ theme }) => theme.mediaQuery.mobile} {
    height: 52px;

    .logo {
      padding: 0 0 18px 10px;
      img {
        height: 40px;
      }
    }

    .auth {
      position: absolute;
      top: 24px;
      right: 12px;
    }

    .category {
      .menu-button {
        display: flex;
        position: absolute;
        top: 26px;
        right: ${({ $isOpen }) => ($isOpen ? "62%" : "52px")};
        background: #fff;
        border: 0;
        font-size: 1.5rem;
      }

      ul {
        position: fixed;
        top: 0;
        right: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
        width: 60%;
        height: 100vh;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        transition: right 0.3s ease-in-out;

        margin: 0;
        padding: 24px;
        z-index: 1000;

        flex-direction: column;
        gap: 16px;
      }
    }
      form{
      display: none;
      }
  }
`;

// const SearchResults = styled.div`
//   position: absolute;
//   top: 100%;
//   left: 0;
//   width: 100%;
//   background: white;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   z-index: 10;
//   max-height: 300px;
//   overflow-y: auto;

//   div {
//     padding: 8px 16px;
//     cursor: pointer;
//     color: ${({ theme }) => theme.color.text};

//     &:hover {
//       background: ${({ theme }) => theme.color.background};
//     }
//   }
// `;

export default Header;