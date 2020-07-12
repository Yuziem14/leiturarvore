import React, { useState } from 'react';
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
    signIn(email, password).catch(err => console.log(err));
  }

  return (
    <Container>
      <Logo source={logo} />

      <Input
        placeholderTextColor="#fff"
        placeholder="Email"
        onChangeText={handleEmailChange}
        value={email}
      />
      <Input
        placeholderTextColor="#fff"
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
  );
}
