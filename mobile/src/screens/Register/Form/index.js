import React, { useState } from 'react';
import { GlobalContainer } from '../../../globalStyles';
import {
  Container,
  Logo,
  Input,
  Button,
  TextButton,
  Login,
  LoginBold,
} from './styles';
import logo from '../../../assets/logo.png';

export default function Form({ route, navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function goToLogin() {
    navigation.navigate('Login');
  }

  function goToCategories() {
    navigation.navigate('UserCategories', {
      formData: { name, email, password },
    });
  }

  function handleNameChange(value) {
    setName(value);
  }

  function handleEmailChange(value) {
    setEmail(value);
  }

  function handlePasswordChange(value) {
    setPassword(value);
  }

  return (
    <GlobalContainer>
      <Container>
        <Logo source={logo} />

        <Input
          placeholder="Nome de usuário"
          autoCapitalize="words"
          onChangeText={handleNameChange}
          value={name}
        />
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

        <Button activeOpacity={0.7} onPress={goToCategories}>
          <TextButton>Registrar-se</TextButton>
        </Button>

        <Login onPress={goToLogin}>
          Já tem uma conta? <LoginBold>Faça o login</LoginBold>
        </Login>
      </Container>
    </GlobalContainer>
  );
}
