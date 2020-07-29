import styled from 'styled-components';

import {
  GlobalContainer,
  LogoArea as LogoAreaBase,
  Logo as LogoBase,
} from '../../globalStyles';

export const Container = styled(GlobalContainer)`
  background: rgba(34, 0, 102, 0.75);
  align-items: center;
  justify-content: flex-start;
`;

export const LogoArea = styled(LogoAreaBase)`
  padding-bottom: 32px;
`;

export const Logo = styled(LogoBase)`
  width: 104px;
  height: 96px;
`;

export const ContentBox = styled.View`
  width: 75%;
  background: #f4f4f4;
  border-radius: 8px;
  padding: 8px;
  margin: 32px 0;
`;

export const ContentText = styled.Text`
  font-size: 16px;
  text-align: center;
  color: #220066;
`;
