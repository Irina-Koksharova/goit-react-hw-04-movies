import PropTypes from 'prop-types';

function Section({ children, style }) {
  return <section style={style}>{children}</section>;
}

Section.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object.isRequired,
};

export default Section;
