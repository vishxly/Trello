import { v4 as uuidv4 } from "uuid";
import taskImage from "../assets/images/task.jpg";
import taskImage3 from "../assets/images/task3.jpg";
import { Columns } from "../types";
import { getRandomColors } from "../helpers/getRandomColors";

export const Board: Columns = {
  todo: {
    name: "To Do",
    items: [
      {
        id: uuidv4(),
        title: "Admin Panel Front-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "medium",
        deadline: 50,
        image: taskImage3,
        alt: "task image",
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
        column: "todo", // Add the column property
      },
    ],
  },
  doing: {
    name: "Doing",
    items: [
      {
        id: uuidv4(),
        title: "Admin Panel Front-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "low",
        deadline: 50,
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
        column: "doing", // Add the column property
      },
      {
        id: uuidv4(),
        title: "Admin Panel Back-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "medium",
        deadline: 50,
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
        column: "doing", // Add the column property
      },
    ],
  },
  done: {
    name: "Done",
    items: [
      {
        id: uuidv4(),
        title: "Admin Panel Front-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "high",
        deadline: 50,
        image: taskImage,
        alt: "task image",
        tags: [
          { title: "Test", ...getRandomColors() },
          { title: "Front", ...getRandomColors() },
        ],
        column: "done", // Add the column property
      },
    ],
  },
};
