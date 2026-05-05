import { useState, type SubmitEvent } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./add-modal.css";

export type FormData = {
  name: string;
  time: string;
  day: string;
}

type Props = {
  onClose: () => void;
  onAdd: (task: FormData) => void;
};

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const AddModal = ({ onClose, onAdd }: Props) => {
  const [day, setDay] = useState("");
  const [name, setName] = useState("");
  const [time, setTime] = useState("");

  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    onAdd({ name, day, time });
    onClose();
  };

  return (
    <Modal
      open
      onClose={onClose}
      center
      classNames={{
        modal: "react-responsive-modal-modal", 
      }}
    >
      <div className="modal">
        <form onSubmit={onSubmit}>
          <h2>Añadir Tarea</h2>

          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="off"
          />

          <label htmlFor="day">Día</label>
          <select
            id="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            required
          >
            <option value="">Selecciona un día</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <label htmlFor="time">Tiempo</label>
          <input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />

          <button type="submit">Añadir</button>
        </form>
      </div>
    </Modal>
  );
};