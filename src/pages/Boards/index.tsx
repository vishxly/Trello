import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
} from "react-beautiful-dnd"; // 
import { Board } from "../../data/board";
import { Columns, TaskT } from "../../types";
import { onDragEnd } from "../../helpers/onDragEnd";
import { AddOutline } from "react-ionicons";
import AddModal from "../../components/Modals/AddModal";
import Task from "../../components/Task";

const Home = () => {
  const [columns, setColumns] = useState<Columns>(Board);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<string>("todo"); 

  const openModal = (columnId: string) => {
    setSelectedColumn(columnId); 
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddTask = (taskData: TaskT) => {
    const newColumns = { ...columns };
    const column = newColumns[selectedColumn]; 
    column.items.push(taskData); 
    setColumns(newColumns); 
  };

  const handleEditTask = (taskId: string, updatedTask: TaskT) => {
    const updatedColumns = { ...columns };
    Object.keys(updatedColumns).forEach((columnId) => {
      const column = updatedColumns[columnId];
      const updatedItems = column.items.map((task) => {
        if (task.id === taskId) {
          return updatedTask;
        }
        return task;
      });
      updatedColumns[columnId] = { ...column, items: updatedItems };
    });
    setColumns(updatedColumns);
  };

  return (
    <>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <div className="w-full flex items-start justify-between px-5 pb-8 md:gap-0 gap-10 ">
          {Object.entries(columns).map(([columnId, column]) => (
            <div className="w-full flex flex-col gap-0" key={columnId}>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
                  >
                    <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
                      {column.name}
                    </div>
                    {column.items.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided: DraggableProvided) => (
                          <Task
                            provided={provided}
                            task={task}
                            onEdit={handleEditTask}
                          /> 
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <div
                onClick={() => openModal(columnId)}
                className="flex cursor-pointer items-center justify-center gap-1 py-[10px] md:w-[90%] w-full opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
              >
                <AddOutline color={"#555"} />
                Add Task
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>

      <AddModal
        isOpen={modalOpen}
        onClose={closeModal}
        setOpen={setModalOpen}
        handleAddTask={handleAddTask}
        columns={columns}
      />
    </>
  );
};

export default Home;
