import styled from 'styled-components/native';
import { GlobalContainer } from '../../globalStyles';

export const Container = styled(GlobalContainer)``;

export const Header = styled.View`
  align-items: center;
  justify-content: center;
  padding: 16px 16px 32px 16px;
`;

export const Logo = styled.Image`
  width: 80px;
  height: 72px;
`;

export const Search = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #fff;
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
  width: 122px;
  height: 178px;
  margin-right: 16px;
  border-radius: 8px;
`;

export const Book = styled.Image`
  width: 122px;
  height: 178px;
  border-radius: 8px;
`;
