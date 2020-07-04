import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
`;

export const Logo = styled.Image`
  margin-bottom: 20px;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 60px;
  font-size: 14px;
  color: #fff;
  border: #fff 2px solid;
  border-radius: 10px;
  margin-bottom: 15px;
  padding-left: 15px;
`;

export const Button = styled.TouchableOpacity`
  width: 50%;
  height: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #fff;
`;

export const TextButton = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #220066;
`;

export const Login = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: #fff;
  margin-top: 21px;
`;

export const LoginBold = styled(Login)`
  font-weight: bold;
`;
