import { Dispatch, SetStateAction, SyntheticEvent } from "react";

export type HeaderType = {
  darkmode: boolean;
  setDarkmode: Dispatch<SetStateAction<boolean>>;
};

export type Id = string;

export type IndexId = Id[];

export type Todo = {
  id: Id;
  status: string;
  title: string,
  content: string;
  uId?: string;
  // index: number;
};
export type TodoObjectById = {
  [key: string]: Todo;
};
export type HomeType = {
  todoObjectById: TodoObjectById;
  indexId: IndexId;
};
export type MainSectionType = {
  todoObjectById: TodoObjectById;
  indexId: IndexId;
};
export type FormType = {
  setTodoObjectById: Dispatch<SetStateAction<TodoObjectById>>;
  setIndexId: Dispatch<SetStateAction<IndexId>>;
  toogleAddTaskModal: (flag: boolean) => void;
  // todosInfos: Todo[];
};

/**
 * const handleSubmit: HandleSubmit = (e) => {
 *    e.preventDefault();
 *    ...
 *  }
 */
export type HandleSubmit = (e: SyntheticEvent) => void;
export type HandleComplete = (id: Id) => void;
export type RemoveTodo = (id: Id) => void;

export type TodoItem = {
  // setTodosInfos: Dispatch<SetStateAction<Todo[]>>;
  setTodoObjectById: Dispatch<SetStateAction<TodoObjectById>>;
  setIndexId: Dispatch<SetStateAction<IndexId>>;
  todoItem: Todo;
  index: number;
};

export type FilterType = string | undefined;

export type MenuFilter = {
  setFilter: Dispatch<SetStateAction<FilterType>>;
  filter: FilterType;
  incompletedTodos: Todo[];
  handleClearComplete: () => void;
};
