import React from 'react';
import {
  Container,
  Header,
  Main,
  Title,
  ProfileContainer,
  UserInfo,
  UserName,
  Separator,
  Actions,
  Text,
} from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/auth';

export default function Profile() {
  const { user, signOut } = useAuth();

  async function logout() {
    await signOut();
  }

  return (
    <Container>
      <Header>
        <Title>Perfil</Title>
      </Header>
      <Main>
        <ProfileContainer>
          <UserInfo>
            <MaterialIcons name="person" size={32} color="#666666" />
            <UserName>{user.name}</UserName>
          </UserInfo>
          <Separator />
          <Actions>
            <Text>Alterar Senha</Text>
            <Text>Alterar Nome de Usuário</Text>
            <Text onPress={logout}>Sair</Text>
          </Actions>
        </ProfileContainer>
      </Main>
    </Container>
  );
}
