import styled from 'styled-components/native';

import { GlobalContainer } from '../../../globalStyles';

export const Container = styled(GlobalContainer)`
  background-color: #fff;
`;

export const Header = styled.View`
  margin: 24px 0 24px 16px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #666;
`;

export const SubTitle = styled(Title)`
  font-size: 10px;
  margin-top: 0;
`;

export const CategoryContainer = styled.View`
  flex: 1;
  background-color: #220066;
  border-top-right-radius: 30px;
  padding: 8px 32px;
`;

export const CategoryView = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px 0;
`;

export const Square = styled.View`
  border: 1px solid #fff;
  width: 20px;
  height: 20px;
  margin-right: 16px;
`;

export const SelectedSquare = styled(Square)`
  background-color: #05ff00;
`;

export const CategoryName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;

export const SignIn = styled.TouchableOpacity`
  width: 30%;
  height: 60px;
  justify-content: space-evenly;
  align-items: center;
  align-self: flex-end;
`;

export const ButtonText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #fff;
`;
