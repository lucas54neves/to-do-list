import styles from './index.module.css';
import clipboard from '../../assets/clipboard.svg';
import { ToDoType } from '../../types/ToDoType';
import { CheckCircle, Circle, Trash } from '@phosphor-icons/react';

interface ToDoListProps {
  numberOfCreatedTasks: number;
  numberOfConcludedTasks: number;
  toDoList: ToDoType[];
  handleConcludedTask: (id: string) => void;
  handleDeleteTask: (id: string) => void;
  toDoListIsEmpty: () => boolean;
}

interface NotEmptyListProps {
  toDoList: ToDoType[];
  handleConcludedTask: (id: string) => void;
  handleDeleteTask: (id: string) => void;
}

interface TaskProps {
  toDo: ToDoType;
  handleConcludedTask: (id: string) => void;
  handleDeleteTask: (id: string) => void;
}

const EmptyList = () => (
  <div className={styles.emptyList}>
    <div className={styles.clipboard}>
      <img src={clipboard} alt='Clipboard' width='56px' height='56px' />
    </div>
    <span>Você ainda não tem tarefas cadastradas</span>
    <span>Crie tarefas e organize seus itens a fazer</span>
  </div>
);

const Task = ({ toDo, handleConcludedTask, handleDeleteTask }: TaskProps) => (
  <div key={toDo.id} className={styles.toDo}>
    <div className={styles.circle} onClick={() => handleConcludedTask(toDo.id)}>
      {toDo.concluded ? (
        <CheckCircle size={17.45} color='#4ea8de' />
      ) : (
        <Circle size={17.45} color='#4ea8de' />
      )}
    </div>
    <div
      className={
        toDo.concluded
          ? styles.concludedTaskDescription
          : styles.notConcludedTaskDescription
      }
    >
      {toDo.description}
    </div>
    <div className={styles.trash} onClick={() => handleDeleteTask(toDo.id)}>
      <Trash size={17.45} color='#4ea8de' />
    </div>
  </div>
);

const NotEmptyList = ({
  toDoList,
  handleConcludedTask,
  handleDeleteTask,
}: NotEmptyListProps) => (
  <div className={styles.notEmptyList}>
    {toDoList.map((toDo) => (
      <Task
        toDo={toDo}
        handleConcludedTask={handleConcludedTask}
        handleDeleteTask={handleDeleteTask}
      />
    ))}
  </div>
);

export const ToDoList = ({
  numberOfConcludedTasks,
  numberOfCreatedTasks,
  toDoList,
  handleConcludedTask,
  handleDeleteTask,
  toDoListIsEmpty,
}: ToDoListProps) => {
  return (
    <div className={styles.toDoList}>
      <header>
        <div className={styles.createdTasks}>
          <span>Tarefas criadas</span>
          <div>{numberOfCreatedTasks}</div>
        </div>
        <div className={styles.concludedTasks}>
          <span>Concluídas</span>
          <div
            className={styles.concludedTasksCircle}
          >{`${numberOfConcludedTasks} de ${numberOfCreatedTasks}`}</div>
        </div>
      </header>
      <hr className={styles.divider} />
      {toDoListIsEmpty() ? (
        <EmptyList />
      ) : (
        <NotEmptyList
          toDoList={toDoList}
          handleConcludedTask={handleConcludedTask}
          handleDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
};
