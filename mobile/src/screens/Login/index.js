import React, { useState } from 'react';
import { Alert } from 'react-native';
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
import { useOffline } from '../../contexts/offline';

import logo from '../../assets/logo.png';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const { connection } = useOffline();

  function handleEmailChange(value) {
    setEmail(value);
  }

  function handlePasswordChange(value) {
    setPassword(value);
  }

  function handleRegister() {
    if (!connection.isInternetReachable) {
      return Alert.alert(
        'Ooops...',
        'Por favor, conecte-se a internet para prosseguir!'
      );
    }

    navigation.navigate('RegisterForm');
  }

  function handleSignIn() {
    if (!connection.isInternetReachable) {
      return Alert.alert('Ooops...', 'Por favor, conecte-se a internet!');
    }

    signIn(email, password).catch(err =>
      Alert.alert('Ooops...', 'Credenciais não encontradas!')
    );
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
