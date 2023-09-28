import {
  ChangeEvent,
  FormEvent,
  InvalidEvent,
  useEffect,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import './global.css';
import styles from './App.module.css';
import { ToDoType } from './types/ToDoType';
import { Add } from './components/Add';
import { Header } from './components/Header';
import { ToDoList } from './components/ToDoList';

export const App = () => {
  const [numberOfConcludedTasks, setNumberOfConcludedTasks] =
    useState<number>(0);
  const [numberOfCreatedTasks, setNumberOfCreatedTasks] = useState<number>(0);
  const [toDoList, setToDoList] = useState<ToDoType[]>([]);
  const [newTaskDescription, setNewTaskDescription] = useState<string>('');

  const isNewTaskDescriptionEmpty = newTaskDescription === '';

  const toDoListIsEmpty = () => toDoList.length === 0;

  const handleCreateNewTask = (event: FormEvent) => {
    event.preventDefault();

    setToDoList((state) => [
      ...state,
      { description: newTaskDescription, concluded: false, id: uuidv4() },
    ]);

    setNewTaskDescription('');
  };

  const handleNewTaskDescriptionChanged = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.target.setCustomValidity('');

    setNewTaskDescription(event.target.value);
  };

  const handleNewTaskDescriptionInvalid = (
    event: InvalidEvent<HTMLTextAreaElement>
  ) => {
    event.target.setCustomValidity('Esse campo é obrigatório!');
  };

  const handleConcludedTask = (id: string, isChecked: boolean) => {
    setToDoList((state) =>
      state.map((toDo) => {
        if (toDo.id === id) {
          const concludedTask = toDo;

          concludedTask.concluded = isChecked;

          return concludedTask;
        }

        return toDo;
      })
    );
  };

  const handleDeleteTask = (id: string) => {
    setToDoList((state) => state.filter((toDo) => toDo.id !== id));
  };

  useEffect(() => {
    const numberOfConcludedTasksAux = toDoList.reduce(
      (accumulator, currentValor) => {
        if (currentValor.concluded) return accumulator + 1;

        return accumulator;
      },
      0
    );

    setNumberOfConcludedTasks(numberOfConcludedTasksAux);
    setNumberOfCreatedTasks(toDoList.length);
  }, [toDoList]);

  return (
    <div className={styles.app}>
      <Header />
      <Add
        isNewTaskDescriptionEmpty={isNewTaskDescriptionEmpty}
        newTaskDescription={newTaskDescription}
        handleCreateNewTask={handleCreateNewTask}
        handleNewTaskDescriptionChanged={handleNewTaskDescriptionChanged}
        handleNewTaskDescriptionInvalid={handleNewTaskDescriptionInvalid}
      />
      <ToDoList
        numberOfConcludedTasks={numberOfConcludedTasks}
        numberOfCreatedTasks={numberOfCreatedTasks}
        toDoList={toDoList}
        handleConcludedTask={handleConcludedTask}
        handleDeleteTask={handleDeleteTask}
        toDoListIsEmpty={toDoListIsEmpty}
      />
    </div>
  );
};
