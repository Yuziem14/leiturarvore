import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';

import {
  Container,
  Main,
  Panel,
  ImageWrapper,
  CoverImage,
  BasicInfo,
  Title,
  InfoBox,
  InfoEnd,
  Description,
  InfoText,
  InfoSeparator,
  Actions,
  Button,
  ButtonText,
  Separator,
} from './styles';
import Header from '../../components/Header';
import AppLoading from '../../components/AppLoading';
import * as bookApi from '../../services/books.api';
import { useOffline } from '../../contexts/offline';

export default function BookDetails({ route, navigation }) {
  const { slug, url } = route.params;
  const [book, setBook] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const { downloadBook, removeDownload } = useOffline();

  async function _loadBook() {
    const data = await bookApi.findBook(slug);
    setBook(data);
  }

  async function toggleDownload() {
    if (book.isDownloaded) {
      await removeDownload(slug);
    } else {
      setIsDownloading(true);
      await downloadBook(slug);
      setIsDownloading(false);
    }

    _loadBook();
  }

  function openBook() {
    navigation.navigate('Read', { url, isDownloaded: book.isDownloaded });
  }

  useEffect(() => {
    try {
      _loadBook();
    } catch (err) {
      console.log('Load Book: ', err);
    }
  }, []);

  if (!book) return <AppLoading />;

  let downloadText = '';
  let icon = '';
  if (isDownloading) {
    icon = 'alert-triangle';
    downloadText = '...';
  } else {
    icon = book.isDownloaded ? 'trash' : 'download';
    downloadText = book.isDownloaded ? 'Remover' : 'Download';
  }

  return (
    <Container>
      <Header />
      <Main>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Panel>
            <ImageWrapper>
              <CoverImage
                resizeMode={'cover'}
                source={{
                  uri: book.image,
                }}
              />
            </ImageWrapper>
            <BasicInfo>
              <Title>{book.title}</Title>
              <InfoBox>
                <Description>Autor(a):</Description>
                <InfoText>{book.author}</InfoText>
              </InfoBox>
              <InfoSeparator>-</InfoSeparator>
              <InfoBox>
                <Description>Editora:</Description>
                <InfoText>{book.publisher}</InfoText>
              </InfoBox>
              <InfoSeparator>-</InfoSeparator>
              <InfoBox>
                <Description>Edição:</Description>
                <InfoText>{book.edition}</InfoText>
              </InfoBox>
            </BasicInfo>
          </Panel>
          <InfoBox>
            <Description>Sinopse:</Description>
            <InfoText>{book.sinopse}</InfoText>
          </InfoBox>
          <Separator />
          <InfoBox>
            <Description>Idioma:</Description>
            <InfoText>{book.language}</InfoText>
          </InfoBox>
          <InfoBox>
            <Description>Categorias:</Description>
            <InfoText>{book.categories.join(' - ')}</InfoText>
          </InfoBox>
          <InfoBox>
            <Description>Temáticas:</Description>
            <InfoText>{book.themes.join(' - ')}</InfoText>
          </InfoBox>
          <InfoBox>
            <Description>Características:</Description>
            <InfoText>{book.characteristics.join(' - ')}</InfoText>
          </InfoBox>
          <InfoEnd />
          {url && (
            <Actions>
              <Button activeOpacity={0.7} onPress={() => openBook(url)}>
                <FontAwesome5 name="readme" size={24} color="#fff" />
                <ButtonText>Ler</ButtonText>
              </Button>
              <Button
                activeOpacity={0.7}
                isDownloaded={book.isDownloaded}
                onPress={toggleDownload}
              >
                <Feather name={icon} size={24} color="#fff" />
                <ButtonText>{downloadText}</ButtonText>
              </Button>
            </Actions>
          )}
        </ScrollView>
      </Main>
    </Container>
  );
}
