import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import EditIcon from "../assets/images/edit-icon.svg";
import InputPriority from "./InputPriority";
import DueDate from "./DueDate";

function TaskLine({ task, fetchData, setFetchData, taskList, setTaskList }) {
  const [dueDate, setDueDate] = useState("");

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`
      );
      if (response.status === 204) {
        setFetchData(!fetchData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChecked = async (tasked) => {
    const mapped = taskList.map((taskSolo) => {
      return taskSolo.task_id === Number(tasked.task_id)
        ? { ...taskSolo, task_done: !taskSolo.task_done }
        : { ...taskSolo };
    });
    setTaskList(mapped);
    const body = tasked;
    body.task_done = !tasked.task_done;
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/is-done/${
          tasked.task_id
        }`,
        body
      );
      if (response.status === 204) {
        setFetchData(!fetchData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const date1 = dayjs(task.due_date);
    const date2 = dayjs();

    const hours = date2.diff(date1, "hours");
    const days = Math.floor(hours / 24) * -1;
    setDueDate(days);
  }, [taskList]);

  // TODO : à faire dans pour la due Date ou si déjà dépassé ou aujourd'hui
  // TODO modif due date
  // TODO : CSS

  return (
    <div className="TaskLine">
      <li className="task" key={task.task_id}>
        <InputPriority
          task={task}
          setFetchData={setFetchData}
          fetchData={fetchData}
        />
        <Checkbox
          checked={task.task_done}
          onChange={() => handleChecked(task)}
        />
        <div
          className={task.task_done ? "task-to-edit strike" : "task-to-edit"}
        >
          {task.title}
        </div>
        <DueDate task={task} onDueDate={dueDate} />

        <div className="delete-btn-task">
          <Link to={`/task/${task.task_id}`}>
            <img className="edit-icon-homepage" src={EditIcon} alt="" />
          </Link>
          <Button type="submit" onClick={() => handleDelete(task.task_id)}>
            delete
          </Button>
        </div>
      </li>
    </div>
  );
}

TaskLine.propTypes = {
  task: PropTypes.node.isRequired,
  fetchData: PropTypes.bool.isRequired,
  setFetchData: PropTypes.func.isRequired,
  taskList: PropTypes.array.isRequired,
  setTaskList: PropTypes.func.isRequired,
};

export default TaskLine;
