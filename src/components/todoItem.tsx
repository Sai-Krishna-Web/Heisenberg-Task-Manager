import { HandleComplete, RemoveTodo, TodoItem } from "type/Type";
import Image from "next/image";
import {
  updateDoc,
  doc,
  deleteDoc,
  query,
  collection,
  getDocs,
  arrayRemove,
  where,
} from "firebase/firestore/lite";
import { db } from "utils/firebase";
import { statusColor } from "utils/status";
import { useAuth } from "context/AuthContext";

const TodoItem = ({
  todoItem,
  setIndexId,
  setTodoObjectById,
  index,
}: TodoItem) => {
  const { id, title, status, content } = todoItem;
  const { user } = useAuth();

  const backgroundColor = statusColor[status];

  const handleComplete: HandleComplete = async (id) => {
    /** Update Todo to DB */
    await updateDoc(doc(db, "todo", id), {
      status: 'Completed',
    });

    setTodoObjectById((prev) => {
      return {
        ...prev,
        [id]: { ...prev[id], status: 'Completed' },
      };
    });
  };

  const moveToPending: HandleComplete = async (id) => {
    /** Update Todo to DB */
    await updateDoc(doc(db, "todo", id), {
      status: 'Pending',
    });

    setTodoObjectById((prev) => {
      return {
        ...prev,
        [id]: { ...prev[id], status: 'Pending' },
      };
    });
  };

  const removeTodo: RemoveTodo = async (id) => {
    /** Update Todo to DB */
    await deleteDoc(doc(db, "todo", id));

    /** Update indexArr to DB */
    const q = query(collection(db, "indexId"), where("uId", "==", user?.uid));
    const indexIdDocsRef = await getDocs(q);
    const indexIdDoc = doc(db, "indexId", indexIdDocsRef.docs[0].id);
    await updateDoc(indexIdDoc, { indexArr: arrayRemove(id) });

    /** set states */
    setTodoObjectById((prev) => {
      let updatedTodoObjectById = { ...prev };
      delete updatedTodoObjectById[id];
      return updatedTodoObjectById;
    });
    setIndexId((prev) => prev.filter((indexId) => indexId !== id));
  };
  return (
    <div
      className="flex items-center justify-between py-3 px-5  group
     dark:bg-darkBlue rounded-md m-5"
      style={{ backgroundColor: backgroundColor }}
    >
      <label className="cursor-pointer flex items-center gap-5 group">
        <input
          type="checkbox"
          name="completed"
          className="h-5 w-5 peer hidden"
          checked={status === 'Completed'}
          onChange={(e) => handleComplete(id)}
        />
        <div
          className="h-5 w-5 border border-neutral-400 rounded-full 
              grid place-items-center"
        >
          {status === 'Completed' && (
            <Image
              src="/icons/completed.svg"
              width={24}
              height={24}
              alt="check"
            />
          )}
        </div>
        <div>
          <p className="dark:text-gray font-semibold group-hover:text-[#635FC7] peer-checked:text-gray-500 peer-checked:line-through">
            {title}
          </p>
          <p className="text-[#828FA3] font-medium peer-checked:text-gray-500 ">
            {content}
          </p>
        </div>
      </label>
      <div className="flex gap-5">
        {status === 'Completed' && <Image
          src="/icons/undo.svg"
          width={24}
          height={24}
          alt="remove todo"
          className="hover:cursor-pointer hover:opacity-70 group-hover:block "
          onClick={(e) => moveToPending(id)}
        />}
        <Image
          src="/icons/delete.svg"
          width={24}
          height={24}
          alt="remove todo"
          className="hover:cursor-pointer hover:opacity-70 group-hover:block "
          onClick={(e) => removeTodo(id)}
        />

      </div>
    </div>
  );
};
export default TodoItem;
