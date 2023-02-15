import React, { useState, useEffect } from "react";
import { Task } from "../../models/task.class";
import { LEVELS } from "../../models/levels.enum";
import TaskComponent from "../pure/task";
import TaskForm from "../pure/forms/taskForm";

// Importamos la hoja de estilos de task.css
import "../../styles/task.scss";
import TaskFormik from "../pure/forms/taskFormik";


function TaskListComponent(props) {
  
  //* Aquí definimos las variables de las tareas por default

  const defaultTask1 = new Task(
    "Example 1",
    "Description 1",
    false,
    LEVELS.NORMAL
  );
  
  const defaultTask2 = new Task(
    "Example 2",
    "Description 2",
    true,
    LEVELS.URGENT
  );
  
  const defaultTask3 = new Task(
    "Example 3",
    "Description 3",
    true,
    LEVELS.BLOCKING
  );

  //* Los Estados de los componentes...  
  // Estado de las tareas 
  const [tasks, setTasks] = useState([
    defaultTask1,
    defaultTask2,
    defaultTask3,
  ]);
  // Estado de si la página está cargando o no 
  const [loading, setLoading] = useState(true);

  // Control del ciclo de vida del componente

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); //* Esto es para hacer una "simulación" de cargando tarea
    }, 2000)

    return () => {
      console.log("TaskList component is going to unmount...");
    };
  }, [tasks]);

  function completeTask(task) {
    const index = tasks.indexOf(task);
    const tempTasks = [...tasks];
    tempTasks[index].completed = !tempTasks[index].completed;

    // Actualizamos el estado del componente de la nueva lista y este actualizará la iteración de la tarea en orden para mostrar las tares actualizadas

    setTasks(tempTasks);
  }

  function deleteTask(task) {
    const index = tasks.indexOf(task);
    const tempTasks = [...tasks];
    tempTasks.splice(index, 1);
    setTasks(tempTasks);
  }

  function addTask(task) {
    const tempTasks = [...tasks];
    tempTasks.push(task);
    setTasks(tempTasks);
  }

  /**
   * Guardamos el elemento principal en una función y luego en una variable
   */

  function Table() {
    return (
      <table>
        <thead>
          <tr>
            <th scope="col"> Title </th>
            <th scope="col"> Description </th>
            <th scope="col"> Priority </th>
            <th scope="col"> Actions </th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task, index) => {
            return (
              <TaskComponent
                key={index}
                task={task}
                complete={completeTask}
                remove={deleteTask}
              ></TaskComponent>
            );
          })}
        </tbody>
      </table>
    );
  }

  /**
   * Esto nos permite pintar o no la lista, dependiendo si hay elementos en Task
   */
  let tasksTable;

  if(tasks.length > 0) {
    tasksTable = <Table></Table>
  } else {
    tasksTable = <div>
      <h3> There are no tasks to show </h3>
      <h4> Please, create one </h4>
    </div>
  }

  /**
   * Estilo para cuando esté en loading
   */

  const loadingStyle = {
    color: 'hotpink',
    fontSize: '30px',
    fontWeight: 'bold'
  }

  return (
    <div>
      <div className="col-12">

        <div className="card">

          {/* Card Header (title) */}
          <div className="card-header p-3">
            <h5>Your Task is:</h5>
          </div>

          {/* Card Body (content) */}
          <div
            className="card-body"
            data-mdb-perfect-scrollbar="true"
            style={{ position: "relative", minHeight: "400px", paddingBottom:'30px' }}
          >
            {/* TODO: Add Loading Spinner */}
          { loading ? (<p style={ loadingStyle }> loading Task ... </p>) : tasksTable }

          </div>

        </div>

      </div>
      
      {/* <TaskForm add={addTask} length={tasks.length}></TaskForm> */}

      <TaskFormik add={addTask} length={tasks.length}></TaskFormik>

    </div>
  );
}


export default TaskListComponent;
