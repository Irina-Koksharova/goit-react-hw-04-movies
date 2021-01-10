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

const scrollToParams = () => {
  window.scrollTo({
    top: 800,
    behavior: 'smooth',
  });
};

export { scrollElement, scrollTo, scrollToParams };
