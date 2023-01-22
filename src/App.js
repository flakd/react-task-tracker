import { useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
//import { useLocation } from "react-router-dom";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      console.log(tasksFromServer);
      setTasks(tasksFromServer);
    }
    getTasks();
  }, []) //empy array is our dependency array

  // We might want to use fetchTasks somewhere else, 
  //  so let's take it out of useEffect()
  const fetchTasks = async() => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json();

    return data;
  }

  const fetchTask = async(id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json();

    return data;
  } 
  // Toggle the displaying of our AddTask form
  const handleToggleAddTask = () => {
    setShowAddTask(!showAddTask);
  }

  // AddTask
  const handleAddTask = async (task) => {
    console.log("I clicked the Save button");
    console.log(task)

    /*//// we're going to persist to server and it will generate an id for us
    let tasksIdArray = [];
    for (let t in tasks ) {
      tasksIdArray.push(parseInt(tasks[t].id));
    }
    console.log(tasksIdArray);
    const max = Math.max(...tasksIdArray);
    const id = max + 1;    
    const newTask = {id, ...task}

    /************************************************************* */
    // THE FOLLOWING is CODE THAT THE TUTORIAL guy used, but it
    //  causes an ERROR ==> returns only 1 object (the new object/task?), 
    //  not at array of objects/tasks
    //----------------------------------------------------------
    //    setTasks(newTask, ...tasks); 
    //      
    //this doesn't work either:    
    //    setTasks(...tasks, data);   
    //
    //So, I came up with this myself and it seems to work:
    //----------------------------------------------------------
    /*setTasks(tasks.concat(newTask)); 
    *********************************************************************/

    const res = await fetch("http://localhost:5000/tasks",{
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    const data = await res.json();
    setTasks([...tasks,data]);
  }
  // Delete Task
  const handleDeleteTask = async (id) =>{
    console.log("I am going to delete task #%s", id);
    await fetch(`http://localhost:5000/tasks/${id}`, { 
      method: "DELETE",
    });

    setTasks(tasks.filter( (task) => task.id !== id))
  }
  const handleToggleReminder = async (id) => {
    console.log("I am going to toggle the reminder on task #%s", id);
/*     setTasks(() => {
      const task = tasks.find( (task) => task.id === id);
      task.reminder = !task.reminder;
      console.log("task.reminder=%s", task.reminder);
    }) */
    const taskToToggle = await fetchTask(id);
    const updTask = {...taskToToggle,
      reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json();

    setTasks(
      tasks.map((task) => 
      task.id === id ? 
      {...task, reminder: data.reminder}  : 
      task
    ));
  }
  //const location = useLocation();
  const location = null;
  return (
    <Router>
      <div className="container">
        <Header onToggleAddTask={handleToggleAddTask} showAddTask={showAddTask} location={location}/>
        <Routes>
          <Route path="/" exact element={
            <>
              { showAddTask && <AddTask onAdd={handleAddTask}/> } 
              { tasks.length === 0 ?
                "No Tasks Right Now" :        
                <Tasks 
                  tasks={tasks} 
                  onDeleteTask={handleDeleteTask}
                  onToggleReminder={handleToggleReminder}
                />
              }
            </>
          } />
          <Route path="/about" element={<About />} />
        </Routes>
        { //location.pathname === "/" && (<Footer />)
          <Footer />
        }
      </div>
    </Router>
  );
}


export default App;
