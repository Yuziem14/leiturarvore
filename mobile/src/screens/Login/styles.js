import styled from 'styled-components/native';

const _Text = styled.Text`
  color: #fff;
  font-size: 14px;
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
`;

export const Logo = styled.Image`
  margin-bottom: 20px;
`;

export const Input = styled.TextInput`
  width: 85%;
  height: 60px;
  font-size: 14px;
  border: #fff 2px solid;
  border-radius: 10px;
  margin-bottom: 15px;
  padding-left: 15px;
`;

export const Actions = styled.View`
  flex-direction: row;
  width: 80%;
  justify-content: space-between;
  align-items: center;
`;

export const Forgot = styled(_Text)`
  font-weight: 500;
`;

export const Button = styled.TouchableOpacity`
  border-radius: 10px;
  background-color: #fff;
  height: 60px;
  width: 40%;
  justify-content: center;
  align-items: center;
`;

export const TextButton = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #220066;
`;

export const Register = styled(_Text)`
  line-height: 16px;
  margin-top: 21px;
`;

export const TextBold = styled(Register)`
  font-weight: bold;
`;
