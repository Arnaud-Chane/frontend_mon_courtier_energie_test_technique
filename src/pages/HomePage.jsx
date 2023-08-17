import { useState, useEffect } from "react";
import axios from "axios";
// import dayjs from "dayjs";
import { Button, Input, DatePicker, Space } from "antd";

import TaskLine from "../components/TaskLine";

function HomePage() {
  const [taskList, setTaskList] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [fetchData, setFetchData] = useState(false);
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/tasks`
        );
        setTaskList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTask();
  }, [fetchData]);

  // useEffect(() => {
  //   const date1 = dayjs().format("YYYY-MM-DD");
  //   console.log(date1);
  //   // console.log(
  //   taskList.forEach((task, index) => {
  //     // task.dueDate = date1.diff(date2, "day");
  //     // taskList[index].dueDate = date1.diff(task.dueDate, "day");
  //     console.log(task.due_date)
  //   });
  //   // );
  //   // const date2 = dateString.split(" ")[0];
  //   // setInDueDate(Math.abs(date1.diff(date2, "day")));
  // }, [taskList]);

  function compareByPriority(a, b) {
    return a.task_priority - b.task_priority;
  }

  const handleOnChange = (e) => {
    e.preventDefault();
    setTaskTitle(e.target.value);
  };

  const handleSubmit = async () => {
    const body = {
      title: taskTitle,
      detail: "",
      task_done: 0,
      task_archived: 0,
      task_priority: taskList.length + 1,
      due_date: dueDate,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks`,
        body
      );
      if (response.status === 201) {
        setTaskTitle("");
        setFetchData(!fetchData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTimePicker = (value, dateString) => {
    setDueDate(dateString);
  };

  return (
    <div className="HomePage">
      <div className="input-task">
        <Input
          value={taskTitle}
          placeholder="Ecrire une tâche"
          onChange={handleOnChange}
          className="task-input"
        />
        <div className="time-picker">
          <Space direction="vertical" size={12}>
            A finir avant :
            <DatePicker
              onChange={handleTimePicker}
              placeholder="Choisir une date"
            />
          </Space>
        </div>
      </div>
      <div className="add-btn-task">
        <Button type="submit" onClick={() => handleSubmit()}>
          +
        </Button>
      </div>
      <ul className="task-list">
        {taskList.sort(compareByPriority).map((task) => {
          return (
            <TaskLine
              task={task}
              taskInfo={task}
              setFetchData={setFetchData}
              fetchData={fetchData}
              taskList={taskList}
              setTaskList={setTaskList}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default HomePage;
