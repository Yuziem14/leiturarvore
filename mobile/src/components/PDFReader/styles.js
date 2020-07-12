import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { GlobalContainer } from '../../globalStyles';

export const Container = styled(GlobalContainer)`
  background: #fff;
`;

export const PdfContainer = {
  flex: 1,
  alignSelf: 'flex-start',
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height - 32,
  backgroundColor: '#333',
};

export const PageLocator = styled.View`
  width: 100%;
  height: 32px;
  flex-direction: row;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  background: #fff;
`;

export const PageLocatorText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #220066;
  margin: 0 4px;
`;

export const PageLocatorTotal = styled(PageLocatorText)`
  font-size: 18px;
  color: #666;
`;

export const PageLocatorSlash = styled(PageLocatorText)`
  font-size: 18px;
  color: #666;
`;
