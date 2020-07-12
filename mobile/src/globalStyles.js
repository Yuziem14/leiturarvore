import styled from 'styled-components/native';
import Constants from 'expo-constants';

export const GlobalContainer = styled.View`
  flex: 1;
  background-color: #220066;
  padding-top: ${Constants.statusBarHeight}px;
`;

export const Main = styled(GlobalContainer)`
  border-top-right-radius: 30px;
  background-color: #fff;
  padding: 32px 32px 0px 32px;
  align-items: center;
`;

export const LogoArea = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  width: 88px;
  height: 72px;
`;

export const FormInput = styled.TextInput`
  width: 100%;
  height: 60px;
  font-size: 14px;
  color: #fff;
  border: #fff 2px solid;
  border-radius: 10px;
  margin-bottom: 15px;
  padding-left: 15px;
`;

export const Search = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  align-self: center;
  margin-top: 24px;
`;

export const Input = styled.TextInput`
  width: 90%;
  height: 32px;
  font-size: 16px;
  font-weight: bold;
  color: #666;
  background: #fff;
  padding: 8px 0px 8px 8px;
`;

export const Button = styled.TouchableOpacity`
  width: 10%;
  height: 32px;
  align-items: center;
  justify-content: center;
  padding-right: 8px;
`;
