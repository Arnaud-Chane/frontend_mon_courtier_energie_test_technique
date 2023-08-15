import { useState, useEffect } from "react";
import { Input } from "antd";
import PropTypes from "prop-types";
import axios from "axios";

function InputPriority({ task, setFetchData, fetchData }) {
  const [taskPriority, setTaskPriority] = useState();

  useEffect(() => {
    setTaskPriority(task.task_priority);
  }, []);

  const handleFocusOut = async () => {
    const body = {
      task_priority: taskPriority,
    };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${
          task.task_id
        }/priority`,
        body
      );
      if (response.status === 204) {
        setFetchData(!fetchData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="InputPriority">
      <Input
        value={taskPriority}
        onChange={(e) => setTaskPriority(e.target.value)}
        onBlur={() => handleFocusOut()}
      />
    </div>
  );
}

InputPriority.propTypes = {
  task: PropTypes.shape({
    task_priority: PropTypes.number.isRequired,
    task_id: PropTypes.number.isRequired,
  }).isRequired,
  setFetchData: PropTypes.func.isRequired,
  fetchData: PropTypes.bool.isRequired,
};

export default InputPriority;
