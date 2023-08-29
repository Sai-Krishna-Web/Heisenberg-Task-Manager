import type { NextPage } from "next";
import { Layout } from "layout";
import { useAuth } from "../../context/AuthContext";
import { FilterType, IndexId, Todo, TodoObjectById } from "type/Type";
import Form from "components/todoForm";
import TodoItem from "components/todoItem";
import { useEffect, useState } from "react";
import MenuFilter from "components/menuFilter";
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore/lite";
import { db } from "utils/firebase";

const Dashboard: NextPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [todoObjectById, setTodoObjectById] = useState<TodoObjectById>({});
  const [indexId, setIndexId] = useState<IndexId>([]);
  const [filter, setFilter] = useState<FilterType>();
  const [addTaskModal, setAddTaskModel] = useState(false);
  const todosInfos = indexId.map((id) => todoObjectById[id]);

  useEffect(() => {
    const getData = async () => {
      if (user) {
        setLoading(true);
        const getTodoDocs = async () => {
          const q = query(collection(db, "todo"), where("uId", "==", user.uid));
          const docsRef = await getDocs(q);
          if (docsRef.empty) {
            return {};
          } else {
            let todoObjectById: TodoObjectById = {};
            docsRef.forEach((doc) => {
              let docData = doc.data();
              todoObjectById[doc.id] = { ...docData, id: doc.id } as Todo;
            });
            return todoObjectById;
          }
        };
        const getIndexIdDocs = async () => {
          const q = query(
            collection(db, "indexId"),
            limit(1),
            where("uId", "==", user.uid)
          );
          const docsRef = await getDocs(q);
          if (docsRef.empty) {
            return [];
          } else {
            let docData = docsRef.docs[0].data();
            let indexId = docData.indexArr as IndexId;
            return indexId;
          }
        };
        const todoObjectById = await getTodoDocs();
        const indexId = await getIndexIdDocs();
        setTodoObjectById(todoObjectById);
        setIndexId(indexId);
        setLoading(false);
      }
    };
    getData();
  }, [user]);

  const todosInfosFiltered =
    filter !== undefined
      ? todosInfos?.filter((todo) => todo?.status === filter)
      : todosInfos;
  const incompletedTodos = todosInfos?.filter((todo) => todo?.status !== 'Completed');

  const handleClearComplete = async () => {
    const updatedTodoObjectById = { ...todoObjectById };
    const batch = writeBatch(db);
    const updatedIndexId = todosInfos
      .filter((item) => {
        if (item.status !== 'Completed') {
          return true;
        } else {
          delete updatedTodoObjectById[item.id];
          const docRef = doc(db, "todo", item.id);
          batch.delete(docRef);
          return false;
        }
      })
      .map((item) => item.id);
    setTodoObjectById(updatedTodoObjectById);
    setIndexId(updatedIndexId);

    const q = query(collection(db, "indexId"), where("uId", "==", user?.uid));
    const indexIdDocsRef = await getDocs(q);
    const indexIdDoc = doc(db, "indexId", indexIdDocsRef.docs[0].id);
    await updateDoc(indexIdDoc, { indexArr: updatedIndexId });

    await batch.commit();
  };


  return (
    <Layout>
      <main className="p-4">
        <div className="container mx-auto flex flex-col items-center  gap-5">

          <div className="flex gap-[1.5rem]  w-full justify-between">
            <h1 className="text-2xl text-center text-[#635FC7] font-semibold">Your Dashboard</h1>
            <button
              onClick={() => setAddTaskModel(true)}
              className="bg-[#635FC7] hover:bg-[#A8A4FF] duration-200 flex justify-center items-center gap-[0.5rem] w-[9rem] py-1 rounded-md text-white"
            >
              Add New Task
            </button>

          </div>
          {addTaskModal && <Form setIndexId={setIndexId} setTodoObjectById={setTodoObjectById} toogleAddTaskModal={setAddTaskModel} />}
          <section
            className="
        w-full
        shadow-[0_30px_60px_-10px_rgba(6,0,74,0.15)] relative
        bg-white dark:bg-darkBlue rounded-md divide-y
      "
          >
            <MenuFilter
              handleClearComplete={handleClearComplete}
              setFilter={setFilter}
              filter={filter}
              incompletedTodos={incompletedTodos}
            />{!loading ?
              (todosInfosFiltered.length > 0 ? (<section className="max-h-todos">
                <div>
                  {todosInfosFiltered.map((todoItem, index) => (
                    <TodoItem
                      key={todoItem?.id}
                      todoItem={todoItem}
                      setTodoObjectById={setTodoObjectById}
                      setIndexId={setIndexId}
                      index={index}
                    />
                  ))}
                </div>
              </section>) : (
                <div className=" flex justify-center py-5">
                  <h3>No Tasks found</h3>
                </div>
              )) : (<div className="flex justify-center py-5">
                <h3>Loading...</h3>
              </div>)}

          </section>
        </div>
      </main>
    </Layout>
  );
};

export default Dashboard;
