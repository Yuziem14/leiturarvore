import React from 'react';
import { Container, ConnectionErrorText } from './styles';

export default function OfflineMessage() {
  return (
    <Container>
      <ConnectionErrorText>Sem conexão com a internet.</ConnectionErrorText>
    </Container>
  );
}
