const getGenresNames = (list, names) => {
  let namesList = [];
  for (let i = 0; i < list.length; i += 1) {
    namesList.push(names.find(name => name.id === list[i]).name);
  }
  return namesList.join(', ');
};

export { getGenresNames };
