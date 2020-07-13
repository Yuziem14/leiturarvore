import React from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  BookSection,
  SectionTitle,
  BookItem,
  BookWrapper,
  Book,
  ActionButton,
} from './styles';

export default function BookList({ title, books, children }) {
  const navigation = useNavigation();

  function handleSelectBook({ slug, url }) {
    navigation.navigate('BookDetails', { slug, url });
  }

  if (books.length === 0) return <></>;

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
            <BookItem>
              <BookWrapper
                activeOpacity={0.8}
                onPress={() =>
                  handleSelectBook({
                    slug: book.slug,
                    url: book.book_url || null,
                  })
                }
              >
                <Book
                  source={{ uri: book.imageUrlThumb || book.cover_image }}
                />
                {React.Children.map(children, child => (
                  <ActionButton activeOpacity={0.8}>{child}</ActionButton>
                ))}
              </BookWrapper>
            </BookItem>
          );
        }}
        keyExtractor={(item, index) => `${title}${item.slug}:${index}`}
      />
    </BookSection>
  );
}
