import React from 'react';
import { Container, LogoArea, Logo } from './styles';

import logo from '../../assets/logo.png';

export default function Header({ children, showLogo = true }) {
  return (
    <Container>
      {showLogo && (
        <LogoArea>
          <Logo source={logo} />
        </LogoArea>
      )}
      {children}
    </Container>
  );
}
