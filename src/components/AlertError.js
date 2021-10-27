import PropTypes from 'prop-types';
export default function AlertError(props) {
  return (
    <div className={props.className} style={{ backgroundColor: '#fed6dd', padding: '10px' }}>
      {props.message}
    </div>
  );
}

AlertError.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string
};
