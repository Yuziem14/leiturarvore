import React, { useState } from 'react';
import { GlobalContainer } from '../../globalStyles';
import {
  Container,
  Logo,
  Input,
  Actions,
  Forgot,
  Register,
  RegisterBold,
  Button,
  TextButton,
} from './styles';
import { useAuth } from '../../contexts/auth';

import logo from '../../assets/logo.png';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  function handleEmailChange(value) {
    setEmail(value);
  }

  function handlePasswordChange(value) {
    setPassword(value);
  }

  function handleRegister() {
    navigation.navigate('RegisterForm');
  }

  function handleSignIn() {
    signIn(email, password)
      .then(isAuthenticated => {
        console.log('user signed in');
      })
      .catch(err => console.log(err));
  }

  return (
    <GlobalContainer>
      <Container>
        <Logo source={logo} />

        <Input
          placeholder="Email"
          onChangeText={handleEmailChange}
          value={email}
        />
        <Input
          placeholder="Senha"
          secureTextEntry
          onChangeText={handlePasswordChange}
          value={password}
        />

        <Actions>
          <Forgot>Esqueceu a senha?</Forgot>
          <Button onPress={handleSignIn}>
            <TextButton>Entrar</TextButton>
          </Button>
        </Actions>
        <Register onPress={() => handleRegister()}>
          Ainda não tem uma conta? <RegisterBold>Registre-se</RegisterBold>
        </Register>
      </Container>
    </GlobalContainer>
  );
}
