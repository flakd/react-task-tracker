import PropTypes from 'prop-types'
import {FaTimes} from 'react-icons/fa'


const Task = ({task, onDelete, onToggleReminder}) => {
  return (
    <div 
      className={ 'task' + (task.reminder ? ' reminder' : '') }
      onDoubleClick={() => onToggleReminder(task.id)}
    >
      <h3>
        Task #{task.id}{' '}
        <FaTimes 
          style={{ 
            color: 'red', 
            pointer: 'cursor' 
          }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <li style={liStyle}>{task.text}</li>
      <li style={liStyle}>{task.day}</li>
      <li style={liStyle}>REMINDER { task.reminder ? 'ON' : 'OFF'}</li>      
    </div>
  )
}

const liStyle = {
  marginLeft: "20px",
}

export default Task
