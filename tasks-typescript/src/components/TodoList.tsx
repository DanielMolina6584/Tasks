import React, { useState } from "react";
import useForm from "../hooks/useForm";
import "./TodoList.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { formValues, handleChange, reset } = useForm({ text: "" });
  const [filtro, setFiltro] = useState<"todas" | "pendientes" | "completadas">(
    "todas"
  );

  const addTodo = (text: string) => {
    if (text.trim() !== "") {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: Date.now(), text, completed: false },
      ]);
      reset();
    }
  };

  const toggleTodoCompletado = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleShowTodas = () => {
    setFiltro("todas");
  };

  const handleShowCompleted = () => {
    if (filtro !== "completadas") {
      setFiltro("completadas");
    }
  };

  const handleShowPending = () => {
    if (filtro !== "pendientes") {
      setFiltro("pendientes");
    }
  };

  const pendientesCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="container">
      <div className="formTareas">
        <h1 className="title">Añade tus tareas</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo(formValues.text);
          }}
        >
          <input
            className="inputAñadir"
            type="text"
            name="text"
            value={formValues.text || ""}
            onChange={handleChange}
            placeholder="Ingrese una nueva Tarea"
          />
          <button className="BtnAgg" type="submit">
            Agregar la tarea
          </button>
        </form>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button className="todo-show-completed" onClick={handleShowCompleted}>
            Mostrar Completadas
          </button>
          <button className="todo-show-todas" onClick={handleShowTodas}>
            Mostrar Todas
          </button>
          <button className="todo-show-pending" onClick={handleShowPending}>
            Mostrar Pendientes
          </button>
        </div>

        <h2 className="title">Tus tareas son: </h2>
        <p className="pendientes-count">Tareas pendientes: {pendientesCount}</p>
        <ul className="list">
          {todos
            .filter(
              (todo) =>
                filtro === "todas" ||
                (filtro === "pendientes" && !todo.completed) ||
                (filtro === "completadas" && todo.completed)
            )
            .map((todo) => (
              <li className="item" key={todo.id}>
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodoCompletado(todo.id)}
                />
                <span
                  className="text"
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.text}
                </span>
                <button
                  className="DeleteBtn"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;