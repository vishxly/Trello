import React, { useState } from "react";
// import { getRandomColors } from "../../helpers/getRandomColors";
import { v4 as uuidv4 } from "uuid";

interface Tag {
  title: string;
  bg: string;
  text: string;
}

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleAddTask: (taskData: any) => void;
  columns: { [key: string]: { name: string } };
}

const AddModal: React.FC<AddModalProps> = ({
  isOpen,
  onClose,
  setOpen,
  handleAddTask,
  columns,
}) => {
  const initialTaskData = {
    id: uuidv4(),
    title: "",
    description: "",
    priority: "",
    deadline: 0,
    image: "",
    alt: "",
    tags: [] as Tag[],
    column: "",
  };

  const [taskData, setTaskData] = useState(initialTaskData);
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setTaskData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const closeModal = () => {
    setOpen(false);
    onClose();
    setTaskData(initialTaskData);
    setErrorMessage("");
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleAddTask(taskData);
      closeModal();
    }
  };

  const validateForm = () => {
    const titleRegex = /^[A-Za-z\s]+$/;
    if (!titleRegex.test(taskData.title)) {
      setErrorMessage("Title should contain only alphabets.");
      return false;
    }

    if (taskData.description.length < 25) {
      setErrorMessage("Description should be at least 25 characters long.");
      return false;
    }

    if (!taskData.column) {
      setErrorMessage("Please select a column.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  return (
    <div
      className={`w-screen h-screen place-items-center fixed top-0 left-0 ${
        isOpen ? "grid" : "hidden"
      }`}
    >
      <div
        className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
        onClick={closeModal}
      ></div>
      <div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}

        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
        />

        <div className="relative w-full h-36">
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            placeholder="Description"
            className="absolute inset-0 w-full h-full px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium resize-none overflow-y-auto"
          />
        </div>

        <select
          name="column"
          value={taskData.column}
          onChange={handleChange}
          className="w-full h-12 px-2 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
        >
          <option value="">Select Column</option>
          {Object.entries(columns).map(([columnId, column]) => (
            <option key={columnId} value={columnId}>
              {column.name}
            </option>
          ))}
        </select>

        <button
          className="w-full rounded-md h-9 bg-slate-500 text-amber-50 font-medium"
          onClick={handleSubmit}
        >
          Submit Task
        </button>
      </div>
    </div>
  );
};

export default AddModal;
