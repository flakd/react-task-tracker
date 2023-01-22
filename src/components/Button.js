import PropTypes from 'prop-types'

const Button = ({text, color, onClick, id}) => {
  return (
    <button id={id} onClick={onClick} style={{ backgroundColor: color}} className='btn'>{text}</button>
  )
}

Button.defaultProps = {
  color: 'steelblue',

}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

export default Button
