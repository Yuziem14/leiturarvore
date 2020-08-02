import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Container } from './styles';

export default function AppLoading({
  backgroundColor = '#220066',
  spinnerColor = '#fff',
  children,
}) {
  return (
    <Container backgroundColor={backgroundColor}>
      {children}
      <ActivityIndicator color={spinnerColor} size="large" />
    </Container>
  );
}
