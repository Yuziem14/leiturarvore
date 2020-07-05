import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Container } from './styles';

export default function AppLoading({
  backgroundColor = '#220066',
  spinnerColor = '#fff',
}) {
  return (
    <Container backgroundColor={backgroundColor}>
      <ActivityIndicator color={spinnerColor} size="large" />
    </Container>
  );
}
