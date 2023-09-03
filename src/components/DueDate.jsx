import dayjs from "dayjs";
import PropTypes from "prop-types";

function DueDate({ task, onDueDate }) {
  return (
    <div className="DueDate">
      {onDueDate === 0 ? (
        <div className="due-date">Aujourd'hui</div>
      ) : !onDueDate ? (
        <></>
      ) : onDueDate < 0 ? (
        <div className="due-date">Date déjà dépassée</div>
      ) : onDueDate === 1 ? (
        <div className="due-date">Il reste {onDueDate} jour</div>
      ) : (
        <div className="due-date">Il reste {onDueDate} jours</div>
      )}
      {!task.due_date ? (
        <></>
      ) : (
        <div className="due-date-date">
          Date : {dayjs(task.due_date).format("DD-MM-YYYY")}
        </div>
      )}
    </div>
  );
}

DueDate.propTypes = {
  task: PropTypes.node.isRequired,
  onDueDate: PropTypes.string.isRequired,
};

export default DueDate;
