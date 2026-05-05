import "./data-table.css";

type Task = {
  name: string;
  time: string;
  id: string;
};

type Days = {
  [key: string]: Task[];
};

type Props = {
  days: Days;
  onDeleteTask: (day: string, id: string) => void;
};

const weekDays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]

export const Datatable = ({ days, onDeleteTask }: Props) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {weekDays.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            {weekDays.map((day) => (
              <td key={day}>
                {days[day]?.map((task) => (
                  <div key={task.id}>
                    <strong>{task.name}</strong>
                    <div>{task.time}</div>
                    <button onClick={() => onDeleteTask(day, task.id)}>
                      Eliminar
                    </button>
                  </div>
                ))}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
