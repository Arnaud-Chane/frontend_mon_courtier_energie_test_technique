import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button, DatePicker, Space } from "antd";
import LogoMCE from "../assets/images/logo-mce.png";
import EditLogo from "../assets/images/edit-icon.svg";

function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { TextArea } = Input;

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`)
      .then((response) => {
        const taskInfo = response.data;
        setTaskTitle(taskInfo.title);
        setTaskDescription(taskInfo.detail);
        setDueDate(taskInfo.due_date);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = async () => {
    const body = {
      title: taskTitle,
      detail: taskDescription,
      task_done: 0,
      task_priority: 2,
      due_date: dueDate,
    };
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}/info`,
        body
      );
      if (response.status === 204) {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTimePicker = (value, dateString) => {
    setDueDate(dateString);
  };

  return (
    <div className="TaskDetailPage">
      <Link to="/">
        <img src={LogoMCE} alt="Logo MCE" className="logo" />
      </Link>
      <div className="page-content">
        <div className="task-title-ctn">
          <div className="task-title-line">
            <Input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="task-title"
            />
            <img src={EditLogo} alt="Logo MCE" className="edit-icon" />
          </div>
          <div className="h_line" />
        </div>
        <div className="task-description-ctn">
          <TextArea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>
        <div className="time-picker">
          <Space direction="vertical" size={12}>
            À finir avant :
            <DatePicker onChange={handleTimePicker} placeholder={dueDate} />
          </Space>
        </div>
        <div className="btn-ctn">
          <div className="update-btn-task">
            <Button
              type="primary"
              onClick={() => handleSubmit()}
              className="update-btn"
            >
              Mettre à jour
            </Button>
          </div>
          <Link to="/">
            <div className="link-to-home-page">Retour</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailPage;
