import "./App.css";
import React, { useState, useEffect } from "react";
import "./css/style.css";
import { v4 as uuidv4 } from "uuid";
import firebase from "./firebase";
import Topbar from "./components/Topbar";

function App() {
  const ref = firebase.firestore().collection("todolist");

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  //add
  function addPost() {
    const newPost = {
      title,
      desc,
      id: uuidv4()
    };
    if (title !== "" && desc !== "") {
      ref
        .doc(newPost.id)
        .set(newPost)
        .catch((err) => {
          console.error(err);
        });
      setTitle("");
      setDesc("");
    } else {
      alert("Add Failed! Is not empty!");
    }
  }

  //delete
  function deletePost(post) {
    //deletepost
    ref
      .doc(post.id) //delete -> id
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  //edit
  function editPost(post) {
    const updatePost = {
      title,
      desc,
    };
    if (title !== "" && desc !== "") {
      ref
        .doc(post.id)
        .update(updatePost)
        .catch((err) => {
          console.error(err);
        });
      setTitle("");
      setDesc("");
    } else {
      alert("Edit Failed ! Is not empty!");
    }
  }
  //call firebase
  function getTodolist() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setPosts(items);
    });
  }

  useEffect(() => {
    getTodolist();
  });

  return (
    <div className="App">
      <Topbar />
      <div className="card-column">
        <div className="input__card title">
          <h1>TODOLIST</h1>
          <img className="img" src="/images/bg_ground.jpg"></img>
          <br />

          <label>Title : </label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <br />

          <label>Desc: </label>
          <input
            type="text"
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
          />
          <br />
          <button className="btn" onClick={() => addPost()}>
            <span className="material-icons">face</span> Create To Do
          </button>
          <h4 className="format-text">
            *กรณี edit ให้กรอกข้อมูลใน input แล้วไปกด edit ที่ เราต้องการจะแก้ไข
          </h4>
        </div>

        <div className="input__card">
          <div>
            {posts.map((post) => (
              <div key={post.id} className="card-detail">
                <h3>{post.title}</h3>
                <p>{post.desc}</p>
                <button className="btn-delete" onClick={() => deletePost(post)}>
                  Delete
                </button>
                <button className="btn-edit" onClick={() => editPost(post)}>
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
