import React from 'react';

import { Container, LogoArea, Logo, ContentBox, ContentText } from './styles';
import logo from '../../assets/logo.png';

import QRCode from '../../components/QRCode';

export default function SharedInfo({ navigation, route }) {
  const { value } = route.params || '';
  return (
    <Container>
      <LogoArea>
        <Logo source={logo} />
      </LogoArea>
      <QRCode content={value} />
      <ContentBox>
        <ContentText>{value}</ContentText>
      </ContentBox>
    </Container>
  );
}
