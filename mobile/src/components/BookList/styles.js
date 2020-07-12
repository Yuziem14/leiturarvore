import styled from 'styled-components/native';

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

export const BookItem = styled.View`
  flex-direction: column;
  justify-content: center;
`;

export const BookWrapper = styled.TouchableOpacity`
  margin-right: 16px;
  border-radius: 8px;
`;

export const Book = styled.Image`
  width: 120px;
  height: 176px;
  border-radius: 8px;
`;

export const ActionButton = styled.TouchableOpacity`
  width: 100%;
  height: 32px;
  align-items: center;
  justify-content: center;
  background: #220044;
  border-radius: 4px;
  margin: 4px 0;
`;
