const scrollElement = id => {
  const positionY = document.getElementById(`${id}`).offsetTop;
  window.scrollTo({
    top: positionY,
    behavior: 'smooth',
  });
};

export { scrollElement };
