import Task from "./Task"

const Tasks = ({tasks, onDeleteTask, onToggleReminder}) => {
  return (
    <>
      {tasks.map((task, index) => (        
        <>        
          <Task 
            //key={task.id} 
            key={index}
            task={task} 
            onDelete={onDeleteTask} 
            onToggleReminder={onToggleReminder}
          />
        </>
))}
    </>
  )
}


export default Tasks
