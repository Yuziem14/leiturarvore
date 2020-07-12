import styled from 'styled-components/native';
import { GlobalContainer } from '../../globalStyles';

export { FormInput as Input } from '../../globalStyles';

const _Text = styled.Text`
  font-size: 14px;
  color: #fff;
`;

export const Container = styled(GlobalContainer)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
`;

export const Logo = styled.Image`
  margin-bottom: 20px;
`;

export const Actions = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Button = styled.TouchableOpacity`
  width: 40%;
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

export const Forgot = styled(_Text)`
  font-weight: 500;
  padding-left: 8px;
`;

export const Register = styled(_Text)`
  line-height: 16px;
  margin-top: 21px;
`;

export const RegisterBold = styled(Register)`
  font-weight: bold;
`;
