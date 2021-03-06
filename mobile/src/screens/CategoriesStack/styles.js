import styled from 'styled-components/native';
import { Main as GlobalMain } from '../../globalStyles';

export { GlobalContainer as Container, Logo } from '../../globalStyles';

export const Main = styled(GlobalMain)`
  padding: 16px 0px 8px 16px;
`;

export const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  text-align: left;
  color: #fff;
`;

export const CategoryContainer = styled.TouchableOpacity`
  width: 45%;
  min-height: 72px;
  align-items: center;
  justify-content: center;
  background: #220066;
  margin: 0 8px 8px 0;
  padding: 8px;
`;

export const CategoryName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: #fff;
`;
