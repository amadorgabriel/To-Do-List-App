import { useState } from "react";

import trashIcon from "../../assets/trash-icon.png";

import "./style.css";

export interface TaskItemProps {
  id: number;
  name: string;
  isFinished?: boolean;
}

export const TaskItem = ({ name, isFinished = false }: TaskItemProps) => {

  const [ checkValue, setCheckValue] = useState(false)

  return (
    <div className="task">
      <div className="task-input">
        <input type="checkbox" onChange={() => {setCheckValue(!checkValue)}}/>
        <p>{name}</p>
      </div>

      <button className="task-button" disabled={checkValue}>
        <img src={trashIcon} alt="Trash Icon" />
      </button>
    </div>
  );
};
