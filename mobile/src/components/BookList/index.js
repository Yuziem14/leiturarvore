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
  function handleSelectBook(params) {
    navigation.navigate('BookDetails', params);
  }

  if (!Array.isArray(books) || books.length === 0) return <></>;

  return (
    <BookSection>
      <SectionTitle>{title}</SectionTitle>
      <FlatList
        data={books}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: book }) => {
          return (
            <BookItem>
              <BookWrapper
                activeOpacity={0.8}
                onPress={() =>
                  handleSelectBook({
                    slug: book.slug,
                    url: book.bookUrl || null,
                  })
                }
              >
                <Book source={{ uri: book.imageUrlThumb }} />
                {React.Children.map(children, child => (
                  <ActionButton
                    onPress={() => child.props.onClick(book)}
                    activeOpacity={0.8}
                  >
                    {child}
                  </ActionButton>
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
