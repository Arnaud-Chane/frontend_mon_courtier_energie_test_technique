import { useState, useEffect } from "react";
import { Input } from "antd";
import PropTypes from "prop-types";

function InputPriority({ task }) {
  const [taskPriority, setTaskPriority] = useState();

  useEffect(() => {
    setTaskPriority(task.task_priority);
  }, []);

  const handleFocusOut = () => {
    console.info(taskPriority);
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
  }).isRequired,
};

export default InputPriority;
