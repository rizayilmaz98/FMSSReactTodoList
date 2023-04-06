import { useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";

function App() {
  //Filtreleme işleminin sonucunu atamak için kullanılacak olan boş array 
  let copy = [];

  //Projede kullanılacak state tanımları
  const [selected, setSelected] = useState("all");
  let [data, setData] = useState([]);
  const [todo, setTodo] = useState("");

  //Form submit edilince çalışacak fonksiyon
  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim() === "") {
      alert("Bir Todo Girin");
    } else {
      data.push({ id: nanoid(), todo: todo, completed: false });
      setTodo("");
    }
  };

  //Todoları tek tek yapıldı olarak işaretlenmesi için çalışacak fonksiyon
  const handleChangeCompleted = (id) => {
    const index = data.findIndex((item) => item.id === id);
    data[index].completed = !data[index].completed;
    setData([...data]);
  };

  //Todoları tek tek silmek için kullanılacak olan fonksiyon 
  const handleDelete = (id) => {
    const index = data.findIndex((item) => item.id === id);
    data.splice(index, 1);
    setData([...data]);
  };

  //Tüm todoları yapıldı işaretlemek için çalışacak fonksiyon
  const handleAllCompleted = () => {
    data.forEach((item) => {
      item.completed = true;
    });
    setData([...data]);
  };

  //Tamamlanmış todoları silmek için çalışacak fonksiyon
  const handleClearCompleted = () => {
    data = data.filter((item) => item.completed === false);
    setData([...data]);
  };

  //Kalan todoların sayısını bulan fonksiyon
  let counter = data.filter((item) => item.completed === false).length;

  //Tıklanılan filtre değeri için state ve datayı değiştiren işlemler
  if (selected === "all") {
    copy = data;
  }
  if (selected === "active") {
    copy = data.filter((item) => item.completed === false);
  }
  if (selected === "completed") {
    copy = data.filter((item) => item.completed === true);
  }

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={handleSubmit}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              autoFocus
            />
          </form>
        </header>

        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onClick={handleAllCompleted}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {copy.map((item) => {
              return (
                <li key={item.id} className="">
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      checked={item.completed === true ? true : false}
                      onChange={() => {}}
                      onClick={() => handleChangeCompleted(item.id)}
                    />
                    <label
                      className={item.completed === true ? "completedTodo" : ""}
                    >
                      {item.todo}
                    </label>
                  </div>
                  <button
                    className="destroy"
                    onClick={() => handleDelete(item.id)}
                  ></button>
                </li>
              );
            })}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>{counter} items Left</strong>
          </span>

          <ul className="filters">
            <li>
              <p
                className={selected === "all" ? "selected" : ""}
                onClick={() => setSelected("all")}
              >
                All
              </p>
            </li>
            <li>
              <p
                className={selected === "active" ? "selected" : ""}
                onClick={() => setSelected("active")}
              >
                Active
              </p>
            </li>
            <li>
              <p
                className={selected === "completed" ? "selected" : ""}
                onClick={() => setSelected("completed")}
              >
                Completed
              </p>
            </li>
          </ul>
          <button className="clear-completed" onClick={handleClearCompleted}>
            Clear completed
          </button>
        </footer>
      </section>
      <footer className="info">
        <p>Click to edit a todo</p>
        <p>
          Created by <a href="https://www.linkedin.com/in/riza-yilmaz/">Rıza YILMAZ</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
