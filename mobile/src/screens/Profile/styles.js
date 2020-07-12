import styled from 'styled-components/native';
import { Main as GlobalMain } from '../../globalStyles';

export { GlobalContainer as Container } from '../../globalStyles';

export const Header = styled.View`
  padding: 64px 0px 32px 32px;
`;

export const Main = styled(GlobalMain)`
  align-items: flex-start;
  padding: 16px 0px 8px 32px;
`;

export const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  text-align: left;
  color: #fff;
`;

export const ProfileContainer = styled.View`
  width: 100%;
  justify-content: space-around;
  border-style: solid;
  border-left-width: 2px;
  border-left-color: #666;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 16px;
  padding-bottom: 40px;
`;

export const UserName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #666666;
  padding-left: 8px;
`;

export const Text = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #666666;
  margin-bottom: 4px;
`;

export const Actions = styled.View`
  padding-top: 16px;
  padding-left: 16px;
`;

export const Separator = styled.View`
  height: 2px;
  width: 80%;
  background-color: #666;
`;
