import React from 'react';
import { FlatList } from 'react-native';
import { BookSection, SectionTitle, BookWrapper, Book } from './styles';
import { useNavigation } from '@react-navigation/native';

export default function BookList({ title, books }) {
  const navigation = useNavigation();
  function handleSelectBook(slug) {
    navigation.navigate('BookDetails', { slug });
  }

  return (
    <BookSection>
      <SectionTitle>{title}</SectionTitle>
      <FlatList
        data={books}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const book = item.book ? item.book : item;
          return (
            <BookWrapper
              activeOpacity={0.8}
              onPress={() => handleSelectBook(book.slug)}
            >
              <Book source={{ uri: book.imageUrlThumb || book.cover_image }} />
            </BookWrapper>
          );
        }}
        keyExtractor={(item, index) => `${title}${item.slug}:${index}`}
      />
    </BookSection>
  );
}
