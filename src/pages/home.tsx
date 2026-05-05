import { useEffect, useState } from "react";
import { AddModal, type FormData } from "../components/add-modal";
import { Datatable } from "../components/data-table";
import "./home.css";

type Days = {
  [key: string]: {
    name: string;
    time: string;
    id: string;
  }[];
}

const defaultDays: Days = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
};

const Home = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [days, setDays] = useState<Days>(defaultDays);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('mis-tareas');

    if (data) {
      try {
        setDays({ ...defaultDays, ...JSON.parse(data) });
      } catch {
        setDays(defaultDays);
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('mis-tareas', JSON.stringify(days));
    }
  }, [days, isLoaded]);

  const handleButtonClick = () => {
    setShowModal(true);
  }

  const onAddNewTask = (newTask: FormData) => {
    const task = {
      id: window.crypto.randomUUID(),
      name: newTask.name,
      time: newTask.time,
    }

    setDays((prev) => ({
      ...prev,
      [newTask.day]: [...(prev[newTask.day] || []), task],
    }));
  }

  const onDeleteTask = (day: string, id: string) => {
    const newDays = {
      ...days,
      [day]: days[day].filter(task => task.id !== id),
    };

    setDays(newDays);
  };

  return (
    <>
      <div className="calendario-semanal">
        <h1>Mi Planificación Semanal</h1>

        <div className="button">
          <button onClick={handleButtonClick}>Añadir</button>
        </div>
      </div>

      <Datatable days={days} onDeleteTask={onDeleteTask} />

      {showModal && (
        <AddModal
          onClose={() => setShowModal(false)}
          onAdd={onAddNewTask}
        />
      )}
    </>
  );
}

export default Home;