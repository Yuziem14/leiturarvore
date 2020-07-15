import api from './api';

export async function fetchCategories() {
  const {
    data: { categories },
  } = await api.get('categories');

  return categories;
}
