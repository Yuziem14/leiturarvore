import styled from 'styled-components/native';
import { Main as GlobalMain } from '../../globalStyles';

export {
  GlobalContainer as Container,
  Search,
  Input,
  Button,
} from '../../globalStyles';

export const Main = styled(GlobalMain)`
  padding: 16px 0px 8px 8px;
`;

export const StartSessionButton = styled.TouchableOpacity`
  width: 95%;
  height: 48px;
  flex-direction: row;
  align-self: center;
  align-items: center;
  justify-content: center;
  background: #220066;
  border-radius: 8px;
  margin: 0 16px 16px 0;
`;

export const StartSessionText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  margin-right: 8px;
`;

export const Action = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ActionText = styled.Text`
  font-size: 14px;
  color: #fff;
  margin-right: 4px;
`;
