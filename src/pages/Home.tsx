import Title from '@/components/common/Title';
import styled from 'styled-components';

function Home() {
  return (
    <HomeStyle>

      <div> Home </div>
    </HomeStyle>
  );
}
const HomeStyle = styled.div`
    display: flex;
    align-items: start;
    justify-content: spa;
    gap: 24px;
`;
export default Home;
