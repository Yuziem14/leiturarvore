import styled from 'styled-components/native';
export { GlobalContainer as Container, Main } from '../../globalStyles';

const _Text = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

export const InfoBox = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Panel = styled(InfoBox)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const ImageWrapper = styled.View`
  width: 120px;
  height: 176px;
  border-radius: 10px;
  margin-right: 16px;
`;

export const CoverImage = styled.Image`
  width: 120px;
  height: 176px;
  border-radius: 10px;
`;

export const BasicInfo = styled.View``;

export const Title = styled(_Text)`
  font-size: 20px;
  margin-bottom: 24px;
`;

export const Description = styled(_Text)`
  margin-right: 4px;
`;

export const InfoText = styled(_Text)`
  color: #666;
`;

export const InfoSeparator = styled(_Text)`
  margin: 2px 0;
`;

export const InfoEnd = styled.View`
  height: 0.1px;
  margin: 4px 0;
`;

export const Separator = styled.View`
  width: 75%;
  height: 1px;
  align-self: center;
  border-color: #666;
  border-style: solid;
  border-bottom-width: 2px;
  margin: 24px 0;
`;

export const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Button = styled.TouchableOpacity`
  max-width: 100%;
  min-width: 45%;
  height: 48px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: ${props => props.backgroundColor || '#220066'};
  padding: 8px 16px;
  margin-bottom: 24px;
`;

export const ButtonText = styled(_Text)`
  font-size: 20px;
  color: #fff;
  margin-left: 8px;
`;
