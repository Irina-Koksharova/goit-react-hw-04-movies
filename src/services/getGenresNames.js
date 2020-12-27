const getGenresNames = genres => {
  return genres
    .reduce((list, genre) => {
      list.push(genre.name);
      return list;
    }, [])
    .join(' ');
};

export { getGenresNames };
