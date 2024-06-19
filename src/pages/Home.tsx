import MainReview from '../components/main/MainReview';
import { useMain } from '../hooks/useMain';
import styled from 'styled-components';

function Home() {
  const {reviews} = useMain();
  return (
    <HomeStyle>
      <MainReview reviews={reviews}/>
    </HomeStyle>
  );
}
const HomeStyle = styled.div`
    // display: flex;
    // align-items: start;
    // justify-content: spa;
    // gap: 24px;
`;
export default Home;
