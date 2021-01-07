const scrollElement = id => {
  const positionY = document.getElementById(`${id}`).offsetTop;
  window.scrollTo({
    top: positionY,
    behavior: 'smooth',
  });
};

const scrollTo = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export { scrollElement, scrollTo };
