import { PlusCircle } from '@phosphor-icons/react';

import styles from './index.module.css';
import { ChangeEvent, FormEvent, InvalidEvent } from 'react';

interface AddProps {
  newTaskDescription: string;
  isNewTaskDescriptionEmpty: boolean;
  handleCreateNewTask: (event: FormEvent) => void;
  handleNewTaskDescriptionChanged: (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleNewTaskDescriptionInvalid: (
    event: InvalidEvent<HTMLTextAreaElement>
  ) => void;
}

export const Add = ({
  newTaskDescription,
  isNewTaskDescriptionEmpty,
  handleCreateNewTask,
  handleNewTaskDescriptionChanged,
  handleNewTaskDescriptionInvalid,
}: AddProps) => (
  <form className={styles.add} onSubmit={handleCreateNewTask}>
    <textarea
      name='taskDescription'
      placeholder='Adicione uma nova tarefa'
      value={newTaskDescription}
      onChange={handleNewTaskDescriptionChanged}
      onInvalid={handleNewTaskDescriptionInvalid}
      required
    />

    <button type='submit' disabled={isNewTaskDescriptionEmpty}>
      Criar <PlusCircle size={15}></PlusCircle>
    </button>
  </form>
);
