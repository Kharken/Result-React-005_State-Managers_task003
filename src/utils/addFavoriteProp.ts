export const addFavoriteProp = <T>(list: T[]): T[] => {
  return list.map((item) => ({
    ...item,
    isFavorite: false,
  }))
}
