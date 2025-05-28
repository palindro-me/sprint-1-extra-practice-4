import {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export const App = ()=> {
  let [tasks, setTasks] = useState([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Rest API", isDone: false },
    { id: v1(), title: "GraphQL", isDone: false },
  ]);

  function removeTask(id: string) {
    let filteredTasks = tasks.filter(t => t.id != id);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let task = { id: v1(), title: title, isDone: false };
    let newTasks = [task, ...tasks];
    setTasks(newTasks);
  }

  let [filter, setFilter] = useState<FilterValuesType>("all");

  const getFilteredTasks = (tasks: TaskType[],filter: FilterValuesType) => {
switch (filter) {
  case 'active':
    return tasks.filter(t => !t.isDone)
  case 'completed':
    return tasks.filter(t => t.isDone)
  default:
    return tasks
}
  //     let tasksForTodolist = tasks;
  //
  // if (filter === "active") {
  //   tasksForTodolist = tasks.filter(t => t.isDone === false);
  // }
  // if (filter === "completed") {
  //   tasksForTodolist = tasks.filter(t => t.isDone === true);
  // }

  }


  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    const newState = tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
    setTasks(newState)
  }

  function changeFilter(filter: FilterValuesType) {
    setFilter(filter);
  }

  return (
    <div className="App">
      <Todolist title="What to learn"
                tasks={getFilteredTasks(tasks, filter)}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
                filter = {filter}
                addTask={addTask} />
    </div>
  );
}
