import { useEffect, useState } from 'react';
import './App.css';
import { MdDeleteOutline } from "react-icons/md";
import { MdDone } from "react-icons/md";

function App() {
  const [iscomplete, setcomplete] = useState(false);
  const [alltodos, setalltodo] = useState([]);
  const [completedTodo, setCompletedTodo] = useState([]);
  const [newtitle, setnewtitle] = useState("");
  const [newdes, setnewdes] = useState("");

  const handlenewtodo = () => {
    let newTodoItem = {
      title: newtitle,
      description: newdes,
    };
    let updatedTodoArr = [...alltodos];
    updatedTodoArr.push(newTodoItem);
    setalltodo(updatedTodoArr);
    localStorage.setItem('todo-List', JSON.stringify(updatedTodoArr));
    setnewtitle("");
    setnewdes("");
  };

  const handledelete = (index) => {
    let remove = [...alltodos];
    remove.splice(index, 1);
    setalltodo(remove);
    localStorage.setItem('todo-List', JSON.stringify(remove));
  };
  
  const handledeleteCompelete = (index) => {
    let remove = [...completedTodo];
    remove.splice(index, 1);
    setCompletedTodo(remove);
    localStorage.setItem('todo-List', JSON.stringify(remove));
  };
  const handledComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();

    let completedOn = dd + '-' + mm + '-' + yyyy;
    let filteredItem = {
      ...alltodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodo];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodo(updatedCompletedArr);
    localStorage.setItem('Completed', JSON.stringify(updatedCompletedArr));
    handledelete(index);
  };

  useEffect(() => {
    let savedtodo = JSON.parse(localStorage.getItem('todo-List'));
    let savedCompletedtodo = JSON.parse(localStorage.getItem('Completed'));
    if (savedtodo) {
      setalltodo(savedtodo);
    }
    if (savedCompletedtodo) {
      setCompletedTodo(savedCompletedtodo);
    }
  },[]);

  return (
    <div className="App">
      <h1>My todo</h1>
      <div className="wrapper">
        <div className="inputs">
          <div className="input-item">
            <label htmlFor="Title">Title</label>
            <input
              type="text"
              value={newtitle}
              onChange={(e) => setnewtitle(e.target.value)}
              placeholder='Enter the title' />
          </div>
          <div className="input-item">
            <label htmlFor="description">Description</label>
            <input type="text" value={newdes} onChange={(e) => setnewdes(e.target.value)} placeholder='Enter the Description' />
          </div>
          <div className="input-item">
            <button className='primary-btn' onClick={handlenewtodo}>Add</button>
          </div>
        </div>
        <div className="btn-area">
          <button className={`secoundery-btn ${iscomplete === false && 'active'}`}
            onClick={() => setcomplete(false)}>Todo</button>
          <button className={`secoundery-btn ${iscomplete === true && 'active'}`}
            onClick={() => setcomplete(true)}>Completed</button>
        </div>

        <div className="todo-list">
          {iscomplete === false &&
            alltodos.map((item, index) => (
              <div className="sub" key={index}>
                <div className="itemm">
                  <h3 style={{ color: 'green', fontSize: '2.0rem' }}>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="icons">
                  <MdDeleteOutline className='n' onClick={() => handledelete(index)} />
                  <MdDone onClick={() => handledComplete(index)} className='correct' />
                </div>
              </div>
            ))
          }
          {iscomplete === true &&
            completedTodo.map((item, index) => (
              <div className="sub" key={index}>
                <div className="itemm">
                  <h3 style={{ color: 'green', fontSize: '2.0rem' }}>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><i>{item.completedOn}</i></p>
                </div>
                <div className="icons">
                  <MdDeleteOutline className='n' onClick={() => handledeleteCompelete(index)} />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
