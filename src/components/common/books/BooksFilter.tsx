import styled from "styled-components";
import { useCategory } from "../../../hooks/useCategory";
import Button from "../Button";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../../constants/queryString";

function BooksFilter() {
  const { category } = useCategory();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategory = (id: number | null)=>{
    const newSearchParams = new URLSearchParams(searchParams);
    if(id === null){
        newSearchParams.delete(QUERYSTRING.CATEGORY_ID);
    }else{
        newSearchParams.set(QUERYSTRING.CATEGORY_ID,id.toString());
    }
    setSearchParams(newSearchParams);
  }
  const handleNews = ()=>{
    const newSearchParams = new URLSearchParams(searchParams);

    if(newSearchParams.get(QUERYSTRING.NEWS)){
        newSearchParams.delete(QUERYSTRING.NEWS);
    }else{
        newSearchParams.set(QUERYSTRING.NEWS,'true');
    }
    setSearchParams(newSearchParams);

  }

  return (
    <BooksFilterStyle>
      <div className="category">
        {category.map((item) => (
          <Button size="medium" schema={
            item.isActive ? 'primary' : 'normal'
          } key={item.category_id} onClick={()=> handleCategory(item.category_id)}>
            {item.category_name}
          </Button>
        ))}
      </div>
      <div className="new">
            <Button size="medium" schema={searchParams.get(QUERYSTRING.NEWS)? 'primary' : 'normal'} onClick={()=> handleNews()}>신간</Button>
      </div>
    </BooksFilterStyle>
  );
}

const BooksFilterStyle = styled.div`
    display: flex;
    gap: 24px;

    .category{
        display: flex;
        gap: 8px;
    }
`;

export default BooksFilter;
