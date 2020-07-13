import React, { useState } from 'react';
import PDF from 'react-native-pdf';
import {
  PdfContainer,
  PageLocator,
  PageLocatorText,
  PageLocatorSlash,
  PageLocatorTotal,
} from './styles';

export default function PDFReader({ sourceUri }) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPages] = useState(1);

  return (
    <>
      <PDF
        style={PdfContainer}
        enablePaging
        onLoadComplete={total => {
          setTotalPages(total);
          setIsLoading(false);
        }}
        onPageChanged={current => setCurrentPage(current)}
        source={{ uri: sourceUri }}
      />
      {!isLoading && (
        <PageLocator>
          <PageLocatorText>{currentPage}</PageLocatorText>
          <PageLocatorSlash>/</PageLocatorSlash>
          <PageLocatorTotal>{totalPage}</PageLocatorTotal>
        </PageLocator>
      )}
    </>
  );
}
