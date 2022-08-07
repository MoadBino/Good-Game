import React, { useState, useContext } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { tokenContext } from "../../App";
import "./style.css";
const Popup = ({ method, id, masseg, setopen, todo,render,setRender }) => {
  const { Token, Settoken } = useContext(tokenContext);
  let title = "";
  let decoded = "";
  if (Token) {
    decoded = jwt_decode(Token);
  }

  const comment = (todo, id,method,title) => {
    axios(`http://localhost:5000/comment/${todo}/${id}`, {
      method: method,
      data: { comment: title },
    })
      .then((resulat) => {
        setopen(false);
        render?setRender(false):setRender(true)
      })
      .catch((err) => {});
  };

  const post = (method, id, title) => {
    axios(`http://localhost:5000/posts/${id}`, {
      method: method,
      data: { title: title },
    })
      .then((resulat) => {

        setopen(false);
        render?setRender(false):setRender(true)
      })
      .catch((err) => {
      });
  };

  return (
    <div>
      <div className="popup-box">
        <div className="box">
          <h2>{masseg}</h2>
          <span
            onClick={() => {
              setopen(false);
            }}
            className="close-icon"
          >
            x
          </span>
          {todo ? (
            method === "put" ? (
              <div>
                <button
                  onClick={() => {
                    comment(todo,id, method, title);
                  }}
                >
                  update your comment
                </button>
                <input
                  onChange={(e) => {
                    title = e.target.value;
                  }}
                ></input>
              </div>
            ) : (
              <button
                onClick={() => {
                  comment(method, id, todo);
                }}
              >
                delete comment
              </button>
            )
          ) : method === "put" ? (
            <div>
              <button
                onClick={() => {
                  post(method, id, title);
                }}
              >
                
              update</button>
              <input
                onChange={(e) => {
                  title = e.target.value;
                }}
              ></input>
            </div>
          ) : (
            <button
              onClick={() => {
                post(method, id);
              }}
            >
              
            delete post</button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Popup;
