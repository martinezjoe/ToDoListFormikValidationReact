import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Task } from "../../models/task.class";
import "../../styles/task.scss";
import { LEVELS } from "../../models/levels.enum";

const TaskComponent = ({ task, complete, remove }) => {
  useEffect(() => {
    console.log("Task has been created");
    return () => {
      console.log(`Task: ${task.name} is going to unmount`);
    };
  }, [task]);

  /**
   * Una función que retorna un Badge
   * dependiendo del nivel de la tarea
   */

  function taskLevelBadge() {
    switch (task.level) {
      case LEVELS.NORMAL:
        return (
          <h6 className="mb-0">
            <span className="badge bg-primary">{task.level}</span>
          </h6>
        );

      case LEVELS.URGENT:
        return (
          <h6 className="mb-0">
            <span className="badge bg-warning">{task.level}</span>
          </h6>
        );

      case LEVELS.BLOCKING:
        return (
          <h6 className="mb-0">
            <span className="badge bg-danger">{task.level}</span>
          </h6>
        );
      default:
        break;
    }
  }

  /**
   * Función que retorna un icono dependiendo de si la tarea está
   * completa o no
   */

  function taskIconCompleted() {
    if (task.completed) {
      return (
        <i
          onClick={() => complete(task)}
          className="bi-toggle-on task-action"
          style={{ color: "green", fontWeight: "bold" }}
        ></i>
      );
    } else {
      return (
        <i
          onClick={() => complete(task)}
          className="bi-toggle-off task-action"
          style={{ color: "darkred" }}
        ></i>
      );
    }
  }

  /**
   *  Estilos para cuando una tarea esté o no completada
   */

  const taskCompleted = {
    color: "rgb(39, 125, 125)",
    fontWeight: "bold",
    textDecoration: "line-through",
    cursor: "pointer",
  };

  const taskPending = {
    fontWeight: "bold",
    color: "hotpink",
    cursor: "pointer",
  };

  return (
    <tr
      className="fw-normal"
      style={task.completed ? taskCompleted : taskPending}
    >
      <th>
        <span
          className="ms-2"
          style={{
            background: "#1a535c",
            padding: "5px",
            borderRadius: "10px",
            color: "white",
          }}
        >
          {task.name}
        </span>
      </th>

      <td className="align-middle">
        <span>{task.description} </span>
      </td>

      <td className="align-middle">
        {/* Ejecutar la función para retornar una elemento badge */}
        {taskLevelBadge()}
      </td>

      <td className="align-middle">
        {/* Función que pone los iconos en base de la tarea completada */}

        {taskIconCompleted()}

        <i
          className="bi-trash task-action"
          onClick={() => remove(task)}
          style={{ color: "darkred", fontSize: "18px" }}
        ></i>
      </td>
    </tr>
  );
};

TaskComponent.propTypes = {
  task: PropTypes.instanceOf(Task).isRequired,
  complete: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default TaskComponent;
