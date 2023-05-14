import React, { useState } from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Write = () => {
  const [value, setValue] = useState('');

  console.log(value)
  return (
    <div className='add'>
      <div className="content">
        <input type="text" placeholder='Title'/>
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
          <input style={{display:"none"}} type="file" name="" id="file" />
          <label classname="file" htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a Draft</button>
            <button>Update</button>
          </div>
        </div>

        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" name="cat" value="africa" id="africa" />
            <label htmlFor="africa">Africa</label>
          </div>
          
          <div className="cat">
          <input type="radio" name="cat" value="asia" id="asia" />
          <label htmlFor="asia">Asia</label>
          </div>
          
          <div className="cat">
          <input type="radio" name="cat" value="ausi" id="ausi" />
          <label htmlFor="ausi">Austalia</label>
          </div>
          
          <div className="cat">
          <input type="radio" name="cat" value="europe" id="europe" />
          <label htmlFor="europe">Europe</label>
          </div>
        
          <div className="cat">
          <input type="radio" name="cat" value="mieast" id="mieast" />
          <label htmlFor="mieast">Middle East</label>
          </div>
          
          <div className="cat">
          <input type="radio" name="cat" value="southa" id="southa" />
          <label htmlFor="southa">South America</label>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Write