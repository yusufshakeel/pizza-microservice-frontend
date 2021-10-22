export default function AlertError(props) {
  return (
    // eslint-disable-next-line react/prop-types
    <div className={props.className} style={{ backgroundColor: '#fed6dd', padding: '10px' }}>
      {/* eslint-disable-next-line react/prop-types */}
      {props.message}
    </div>
  );
}
