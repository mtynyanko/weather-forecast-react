import styled from "styled-components"
import SearchTab from "./SearchTab"

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #c16aff, #1560e1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
const MainContainer = styled.div`
  background: #ffffff;
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  margin: 15px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin-top: 0px;
`;

const Header = styled.h3`
  color: white;
  font-family: "Roboto", sans-serif;
  font-size: 3rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);

`;


const Container = () => {
  return <>
  <Background>
    <Header>WEATHER IN CHARTS</Header>
    <MainContainer>
      <SearchTab />
    </MainContainer>
  </Background>
  </>
} 
export default Container