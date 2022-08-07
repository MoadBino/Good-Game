import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { tokenContext } from "../../App";
import jwt_decode from "jwt-decode";
import "./style.css";
import axios from "axios";
import COD from "./img/Screenshot_2.png";
import eldenring from "./img/test.webp";
import Popup from "../popup/popup";
const localStorage = window.localStorage;
const Addpost = () => {
  const Navigate = useNavigate();
  const [todo, setTodo] = useState("");
  const [render, setRender] = useState(false);
  const [open, setopen] = useState(false);
  const [postId, setPostId] = useState("");
  const [image, setImage] = useState("");
  const [erorr, seterorr] = useState("");
  const [url, setUrl] = useState("");
  const [addtitle, Setaddtitle] = useState("");
  const [title, Settitle] = useState("");
  const [newposts, Setposts] = useState("");
  const [addcomment, Setcomment] = useState("");
  const [method, setmethod] = useState("");
  const [masseg, setMasseg] = useState("");
  
  const { Token, Settoken } = useContext(tokenContext);
  let decoded = "";
  if (Token) {
    decoded = jwt_decode(Token);
  }
  const openpopup = (method, id, masseg) => {
    setopen(true);
    setPostId(id);
    setmethod(method);
    setMasseg(masseg);
  };


  useEffect(() => {
    Getallposts();
  }, [render]);
  const Getallposts = () => {
    axios
      .get("http://localhost:5000/posts")
      .then((resulat) => {
        Setposts(resulat.data.posts);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    Getallposts();
  }, []);

  const addpost = async () => {
    !Token?Navigate("/Register"):
    await axios
      .post(
        "http://localhost:5000/posts/newpost",
        { title: addtitle },
        { headers: { Authorization: `Bearer ${Token}` } }
      )
      .then((resulat) => {
        Getallposts();
      })
      .catch();
  };

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "GGwebsite");
    data.append("cloud_name", "dhiowfje1");
    fetch("https://api.cloudinary.com/v1_1/dhiowfje1/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then(async (data) => {
        setUrl(data.url);

        await axios
          .post(
            "http://localhost:5000/posts/newpost",
            { title: addtitle, postimag: data.url },
            { headers: { Authorization: `Bearer ${Token}` } }
          )
          .then((resulat) => {
            Getallposts();
          })
          .catch((err) => {});
      })
      .catch();
  };

  const allposts =
    newposts &&
    newposts.map((element, index) => {
      if (element.author === decoded.userId) {
        return (
          <div className="mainDaiv" key={index}>
            <div className="imgAndNameAndListChild">
              <div className="imgAndNamemain">
                <img src={element.imag} className="img"></img>
                <h2 className="posttext">{element.creater}</h2>
              </div>

              <div className="dropdown">
                <button className="dropbtn">...</button>
                <div className="dropdown-content">
                  <button
                    onClick={() => {
                      openpopup("put", element._id, "update yourr post");
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      openpopup(
                        "delete",
                        element._id,
                        "are you sure you want to delete"
                      );
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div className="posttext">
              <h1 className="posttext">{element.title}</h1>
            </div>

            {element.postimag ? (
              <img src={element.postimag} className="postImg"></img>
            ) : (
              ""
            )}
            <div key={element._id} className="butons">
              <button
                className="tokenAddpost"
                onClick={() => {
                  axios
                    .post(
                      `http://localhost:5000/comment/new/${element._id}`,
                      { comment: title },
                      { headers: { Authorization: `Bearer ${Token}` } }
                    )
                    .then((resulat) => {
                      Getallposts();
                    })
                    .catch((err) => {});
                }}
              >
                comment
              </button>
            </div>
            <input
              className="inputt"
              onChange={(e) => {
                Settitle(e.target.value);
              }}
              placeholder="Add comment"
            ></input>
            <div>
              {element.comments.map((ele, i) => {
                if (ele.commenter === decoded.userId) {
                  return (
                    <div key={i} className="imgAndName">
                      <div className="commentChild">
                        <div className="imgNAme">
                          <img src={ele.imag} className="img"></img>
                          <h3 className="commentername">{ele.commenterName}</h3>
                        </div>

                        <div className="dropdown">
                          <button className="dropbtn">...</button>
                          <div className="dropdown-content">
                            <button
                              onClick={() => {
                                setTodo("update");
                                openpopup(
                                  "put",
                                  ele._id,
                                  "are you sure you want to Edit the comment"
                                );
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                setTodo("delete");
                                openpopup(
                                  "delete",
                                  ele._id,
                                  "are you sure you want to delete the comment"
                                );
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                      <h2 className="comment">{ele.comment}</h2>
                    </div>
                  );
                } else {
                  return (
                    <div className="imgAndName">
                      <div className="commentImgSndName">
                        <img src={ele.imag} className="img"></img>
                        <h3 className="commentername">{ele.commenterName}</h3>
                      </div>
                      <h2 className="comment">{ele.comment}</h2>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        );
      } else {
        return (
          <div key={index} className="mainDaiv">
            <div className=" mainimgAndName">
              <div className="imgAndName">
                <div className="imgNAme">
                  <img src={element.imag} className="img"></img>
                  <h3 className="posttext">{element.creater}</h3>
                </div>
                <div className="posttext">
                  <h1 className="posttext">{element.title}</h1>
                  {element.postimag ? (
                    <img src={element.postimag} className="postImg"></img>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <button
              className="tokenAddpost"
              onClick={() => {
                axios
                  .post(
                    `http://localhost:5000/comment/new/${element._id}`,
                    { comment: addcomment },
                    { headers: { Authorization: `Bearer ${Token}` } }
                  )
                  .then((resulat) => {
                    Getallposts();
                  })
                  .catch((err) => {});
              }}
            >
              comment
            </button>
            <input
              placeholder="Add comment"
              className="inputt"
              onChange={(e) => {
                Setcomment(e.target.value);
              }}
            ></input>

            <div>
              {element.comments.map((ele, i) => {
                if (ele.commenter === decoded.userId) {
                  return (
                    <div key={i} className="imgAndName">
                      <div className="commentChild">
                        <div className="imgNAme">
                          <img src={ele.imag} className="img"></img>
                          <h3 className="commentername">{ele.commenterName}</h3>
                        </div>
                        <div>
                          <div className="dropdown">
                            <button className="dropbtn">...</button>
                            <div className="dropdown-content">
                              <button
                                onClick={() => {
                                  openpopup(
                                    "put",
                                    ele._id,
                                    "are you sure you want to Edit the comment"
                                  );
                                }}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  openpopup(
                                    "delete",
                                    ele._id,
                                    "are you sure you want to delete the comment"
                                  );
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <h2 className="comment">{ele.comment}</h2>

                    </div>
                  );
                } else {
                  return (
                    <div key={i} className="imgAndName">
                      <div className="imgNAme">
                        <img src={ele.imag} className="img"></img>
                        <h3 className="commentername">{ele.commenterName}</h3>
                      </div>
                      <h2 className="comment">{ele.comment}</h2>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        );
      }
    });

  return (
    <div className="whitespace">
      <img src={COD} className="whitespaceimh"></img>
      <div className="postsDiv">
        {erorr}
        {allposts}
        <div className="addPostMain">
          <button
            className="addpostbutton"
            onClick={() => {
              if (!image && addtitle === "") {
                seterorr("enter your  post");
              } else if (!image) {
                addpost();
              } else {
                uploadImage();
              }
            }}
          >
            Add post
          </button>
          <input
            className="postinput"
            placeholder="Add post"
            onChange={(e) => {
              Setaddtitle(e.target.value);
            }}
          ></input>
          <input
            className="input"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          ></input>
        </div>
      </div>
      <div className="whitespaceimh">
        <img src={eldenring} className="whitespaceim"></img>
      </div>
      {open ? (
        <Popup
          method={method}
          id={postId}
          masseg={masseg}
          setopen={setopen}
          todo={todo}
          setRender={setRender}
          render={render}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Addpost;
