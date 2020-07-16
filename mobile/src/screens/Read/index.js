import React from 'react';

import PdfReader from '../../components/PDFReader';
import EpubReader from '../../components/EpubReader';
import { Container } from './styles';

export default function Read({ route, navigation }) {
  const { url: bookUri, isDownloaded } = route.params;
  const isEpub = new RegExp(/.epub/).test(bookUri);

  return (
    <Container>
      {isEpub ? (
        <EpubReader sourceUri={bookUri} isDownloaded={isDownloaded} />
      ) : (
        <PdfReader sourceUri={bookUri} />
      )}
    </Container>
  );
}
