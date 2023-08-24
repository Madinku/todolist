import React, { useEffect, useState } from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone, MdRadioButtonUnchecked } from 'react-icons/md';
import './styles.css';
import { useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';

type User = {
  name: string;
  surname: string;
};

const users: User[] = [
  { name: 'Madinku', surname: 'Mabala' },
  {
    name: 'Lebogang',
    surname: 'Mabala',
  },
];

const names = users.map((user) => {
  return user.name + ' ' + user.surname;
});

type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {
  console.log({ names, users });
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)));
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo)));
    setEdit(false);
  };

  const inputref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputref.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {() => (
        <form className="todos_single" onSubmit={(e) => handleEdit(e, todo.id)}>
          {edit ? (
            <input
              ref={inputref}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos_single--text"
            />
          ) : todo.isDone ? (
            <s className="todos_single--text">{todo.todo}</s>
          ) : (
            <span className="todos_single--text">{todo.todo}</span>
          )}
          ;
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>

            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>

            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
