import React from 'react';
import { Dimensions } from 'react-native';
import QRCodeBuilder from 'react-native-qrcode-svg';

import logo from '../../assets/logo.png';

export default function QRCode({ content }) {
  return (
    <QRCodeBuilder
      size={Dimensions.get('screen').width * 0.75}
      value={content}
    />
  );
}
