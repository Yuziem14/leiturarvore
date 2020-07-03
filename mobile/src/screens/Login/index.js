import React from 'react';
import { GlobalContainer } from '../../globalStyles';
import {
  Container,
  Logo,
  Input,
  Actions,
  Forgot,
  Register,
  TextBold,
  Button,
  TextButton,
} from './styles';

import logo from '../../assets/logo.png';

export default function Login() {
  return (
    <GlobalContainer>
      <Container>
        <Logo source={logo} />

        <Input placeholder="Email" />
        <Input placeholder="Senha" />

        <Actions>
          <Forgot>Esqueceu a senha?</Forgot>
          <Button>
            <TextButton>Entrar</TextButton>
          </Button>
        </Actions>
        <Register>
          Ainda não tem uma conta? <TextBold>Registre-se</TextBold>
        </Register>
      </Container>
    </GlobalContainer>
  );
}
