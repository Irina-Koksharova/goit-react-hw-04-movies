import PropTypes from 'prop-types';

function Section({ children, style }) {
  return <section style={style}>{children}</section>;
}

Section.propTypes = {
  children: PropTypes.any,
};

export default Section;
