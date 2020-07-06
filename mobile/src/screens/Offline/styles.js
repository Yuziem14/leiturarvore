import styled from 'styled-components/native';
import { GlobalContainer } from '../../globalStyles';

export const Container = styled(GlobalContainer)``;

export const Main = styled(GlobalContainer)`
  border-top-right-radius: 30px;
  background-color: #fff;
  padding: 16px 0px 8px 8px;
`;

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

export const BookSection = styled.View`
  width: 100%;
  padding-bottom: 8px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 8px;
`;

export const BookWrapper = styled.TouchableOpacity`
  width: 120px;
  height: 176px;
  margin-right: 16px;
  border-radius: 8px;
`;

export const Book = styled.Image`
  width: 120px;
  height: 176px;
  border-radius: 8px;
`;

export const BookItem = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

export const ActionButton = styled.TouchableOpacity`
  width: 85%;
  height: 40px;
  align-items: center;
  justify-content: center;
  background: #220066;
  border-radius: 8px;
  margin: 8px;
  margin-left: 0;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 12px;
`;
