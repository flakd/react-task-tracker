import PropTypes from 'prop-types'
import Button from "./Button"


const Header = ({title, onToggleAddTask, isAddTaskVisible, name}) => {
  return (
    <header className='header'>
      <h1>{title}</h1>
      <Button 
        key="AddTask" 
        color={isAddTaskVisible?"blue":"green"}
        text={isAddTaskVisible?"Close":"Add"} 
        id="AddTask" 
        onClick={onToggleAddTask}/>       
    </header>
  )
}

Header.defaultProps = {
  title: "Task Tracker",
  name: "New Guy"
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}
/* const headingStyle = {
  color: "red",
  backgroundColor: "blue",
  textDecoration: "underline",
} */
export default Header
