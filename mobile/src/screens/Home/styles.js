import styled from 'styled-components/native';
import { GlobalContainer } from '../../globalStyles';

export const Container = styled(GlobalContainer)``;

export const Search = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  align-self: center;
  margin-top: 24px;
`;

export const Input = styled.TextInput`
  width: 90%;
  height: 32px;
  font-size: 16px;
  font-weight: bold;
  color: #666;
  background: #fff;
  padding: 8px 0px 8px 8px;
`;

export const Button = styled.TouchableOpacity`
  width: 10%;
  height: 32px;
  align-items: center;
  justify-content: center;
  padding-right: 8px;
`;

export const BooksContainer = styled(GlobalContainer)`
  border-top-right-radius: 30px;
  background-color: #fff;
  padding: 16px 0px 8px 8px;
`;
