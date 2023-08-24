import {  db } from "utils/firebase";
import {  status } from "utils/status";
import { FormType, HandleSubmit } from "type/Type";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "context/AuthContext";


const Form = ({ setTodoObjectById, setIndexId,toogleAddTaskModal }: FormType) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [taskStatus, setTaskStatus] = useState(status[0].value);
  const { user } = useAuth();

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setTaskStatus(e.target.value);
  }

  const handleSubmit: HandleSubmit = async (e) => {
    e.preventDefault();
    

    /** Update Todo to DB */
    const newTodo = {
      title,
      content,
      status: taskStatus,
      uId: user?.uid,
      // index: todosInfos.length,
      // timestamp: serverTimestamp()
    };
    const docRef = await addDoc(collection(db, "todo"), newTodo);
    const id = docRef.id;

    /** Update indexArr to DB */
    const q = query(
      collection(db, "indexId"),
      limit(1),
      where("uId", "==", user?.uid)
    );
    const indexIdDocsRef = await getDocs(q);
    if (indexIdDocsRef.empty) {
      //create indexIdDoc of user into db
      await addDoc(collection(db, "indexId"), {
        uId: user?.uid,
        indexArr: [id],
      });
    } else {
      //update indexIdDoc of user into db
      const indexIdDoc = doc(db, "indexId", indexIdDocsRef.docs[0].id);
      await updateDoc(indexIdDoc, { indexArr: arrayUnion(id) });
    }

    /** Set states */
    setTodoObjectById((prev) => ({
      ...prev,
      [docRef.id]: { ...newTodo, id },
    }));
    setIndexId((prev) => [...prev, id]);

    /** Reset form */
    setContent("");
    setTitle("");
    toogleAddTaskModal(false);
  };
  return (
    <>
<div
className={`fixed md:absolute z-30 w-screen flex justify-center translate-y-[-5.5rem] md:translate-y-[-6.3rem]  `}
>
<form
  onSubmit={handleSubmit}
  className="bg-white dark:bg-[#2B2C37] dark:text-white fixed md:absolute w-[25rem] md:w-[30rem] mt-[2rem] pt-[2rem] pb-[1rem] rounded-lg z-30 overflow-scroll px-[1.65rem] h-[35rem] md:h-[35rem] scale-90 md:scale-95"
>
  <h1 className="font-[600] text-[1.25rem]">Add New Task</h1>
  <div className="flex flex-col gap-[0.7rem]">
    <div>
      <p className="text-[#828FA3] dark:text-white text-[1rem] font-[500] mt-[1.2rem] mb-[0.5rem]">
        Title
      </p>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        name="title"
        type="text"
        placeholder="e.g. Take coffee break"
        className={`outline-none border-[2px] dark:bg-[#2B2C37]  indent-4 h-[3rem] w-full rounded-md appearance-none text-[0.95rem]`}
      />

      <p className="text-[#ea5555] font-[500] text-sm text-left pt-1">
        
      </p>
    </div>
    <div>
      <p className="text-[#828FA3] dark:text-white text-[1rem] font-[500] mb-[0.5rem]">
        Description
      </p>
      <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
        name="description"
        cols={30}
        rows={10}
        autoComplete="off"
        placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
        className={`outline-none border-[2px] dark:bg-[#2B2C37] px-4 h-[7rem] pt-3 w-full rounded-md appearance-none text-[0.95rem] resize-none`}
      />
      <p className="text-[#ea5555] font-[500] text-sm text-left pt-1">
      </p>
    </div>
  </div>
  <div className="mt-[1.5rem]">
    <p className="text-[#828FA3] dark:text-white text-[1rem] font-[500] mb-[0.5rem]">
      Status
    </p>

    <div className="relative">
      <select
        id="dropdown"
        name="services"
        className="cursor-pointer bg-white dark:bg-[#2B2C37] dark:text-white font-[500] text-[#656161] w-full border-2 dark:border-[#3E3F4E] outline-none py-3 px-[1.5rem] appearance-none rounded-md"
        value={taskStatus}
        onChange={handleStatusChange}
      >
        {status.map((item) => (
          <option key={item.value} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
    </div>

    <button className="bg-[#635FC7] flex justify-center rounded-full py-[0.9rem] mt-[1rem] gap-[0.5rem] items-center w-full">
      <p className="text-white font-semibold">Create Task</p>
    </button>
  </div>
</form>
</div>
<div
onClick={() =>toogleAddTaskModal(false)}
className="fixed inset-0 bg-black z-20 opacity-50"
></div>
</>
  );
};
export default Form;
