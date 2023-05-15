import React, { useState } from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate()

  const upload = async() => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data
    
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault()
    const imgUrl = await upload()

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }

  };

  return (
    <div className='add'>
      <div className="content">
        <input type="text" value={title} placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
          <div className="editorContainer">
            <ReactQuill classname="editor" theme="snow" value={value} onChange={setValue} />;
          </div>  
      </div>

      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <input style={{display:"none"}} type="file" name="" id="file" onChange={(e) => setFile(e.target.files[0])} />
          <label classname="file" htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a Draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>

        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" checked={cat === "africa"} name="cat" value="africa" id="africa" onChange={(e) => setCat(e.target.value)}/>
            <label htmlFor="africa">Africa</label>
          </div>
          
          <div className="cat">
          <input type="radio" checked={cat === "asia"} name="cat" value="asia" id="asia" onChange={(e) => setCat(e.target.value)}/>
          <label htmlFor="asia">Asia</label>
          </div>
          
          <div className="cat">
          <input type="radio" checked={cat === "ausi"} name="cat" value="ausi" id="ausi" onChange={(e) => setCat(e.target.value)}/>
          <label htmlFor="ausi">Austalia</label>
          </div>
          
          <div className="cat">
          <input type="radio" checked={cat === "europe"} name="cat" value="europe" id="europe" onChange={(e) => setCat(e.target.value)}/>
          <label htmlFor="europe">Europe</label>
          </div>
        
          <div className="cat">
          <input type="radio" checked={cat === "mieast"} name="cat" value="mieast" id="mieast" onChange={(e) => setCat(e.target.value)}/>
          <label htmlFor="mieast">Middle East</label>
          </div>
          
          <div className="cat">
          <input type="radio" checked={cat === "southa"} name="cat" value="southa" id="southa" onChange={(e) => setCat(e.target.value)}/>
          <label htmlFor="southa">South America</label>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Write