import { MenuFilter } from "type/Type";

const MenuFilter = ({
  incompletedTodos,
  filter,
  setFilter,
  handleClearComplete,
}: MenuFilter) => {
  return (
    <div
      className="flex items-center justify-between  py-3 px-5 group
        text-gray-500 text-sm sm:text-base rounded-t-md overflow-hidden
        bg-indigo-100 dark:bg-darkBlue
      "
    >
      <p className="mr-5 ">{incompletedTodos.length} items left</p>
      <div
        className="flex gap-5 rounded-md 
          max-sm:absolute max-sm:bottom-[-4.5rem] max-sm:left-0 
          max-sm:w-full max-sm:justify-center  max-sm:text-base max-sm:py-3 max-sm:px-5 
          dark:bg-darkBlue
        "
      >
        <button
          onClick={() => setFilter(undefined)}
          className={`menuButton 
            ${filter === undefined && "active"}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('Todo')}
          className={`menuButton 
              ${filter === 'Todo' && "active"}`}
        >
          Todo
        </button>
        <button
          onClick={() => setFilter('Pending')}
          className={`menuButton 
              ${filter === 'Pending' && "active"}`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('Completed')}
          className={`menuButton 
            ${filter === 'Completed' && "active"}`}
        >
          Completed
        </button>
      </div>
      <button onClick={handleClearComplete} className={`clearAllButton`}>
        Clear Completed
      </button>
    </div>
  );
};
export default MenuFilter;
