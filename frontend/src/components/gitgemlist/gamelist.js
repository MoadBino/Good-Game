import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

import adventer from "./img/Tomb_Raider.jpg";
import itstake from "./img/It-Takes-Two-e1643647274115.webp";
import thewitcher from "./img/the withcer.jpg";
import warzone from "./img/battle.jpeg";
import theword from "./img/theword.jpg";
import cyber from "./img/CYPER.webp";


const GetGamesList = () => {
  const token = "" || JSON.parse(localStorage.getItem("token"));

  let games = "";
  let mygames = "";
  const [getapigames, Setgetapigames] = useState([]);
  const [getMyGames, SetgetMyGames] = useState([]);
  const [filter, Setfilter] = useState("All");
  const [target, Settarget] = useState("");
  const [search, Setsearch] = useState("");

  const GetList = async () => {
    await axios
      .get("http://localhost:5000/gamelist/")
      .then((res) => {
        Setgetapigames(res.data);
      })
      .catch();
  };
  useEffect(() => {
    GetList();
    getallgames();
  }, []);

  const getallgames = () => {
    axios
      .get("http://localhost:5000/gamelist/games")
      .then((resulat) => {
        SetgetMyGames(resulat.data.posts);
      })
      .catch();
  };

  if (filter === "search") {
    const list = getapigames.map((element,index) => {
      let gamename = element.name.toLowerCase();
      if (element.name != "Limbo" && gamename.includes(search)) {
        return (
          <div key={index} className="mainCardsDiv">
            <h2 className="gamename">{element.name}</h2>
            <img src={element.background_image} className="gamesimg"></img>
            <div className="gamedetalis">
              <div className="genres">
                <p>genres:</p>{" "}
                {element.genres.map((ele,i) => {
                  if (ele.name !== "Massively Multiplayer") {
                    return (
                      <div key={i}>
                        <p> {ele.name}</p>{" "}
                      </div>
                    );
                  }
                })}
              </div>
              <div className="gamesdetalis">
                <p className="relased">{`Game rate: ${element.rating}`}</p>
                <p>{`released:${element.released}`} </p>
                <p className="playtime">{`playtime:${element.playtime}`}</p>
              </div>
            </div>
          </div>
        );
      }
    });
    games = list;
  } else if (filter === "All") {
    const list = getapigames.map((element,index) => {
      if (element.name != "Limbo") {
        return (
          <div key={index} className="mainCardsDiv">
            <h2 className="gamename">{element.name}</h2>
            <img src={element.background_image} className="gamesimg"></img>
            <div className="gamedetalis">
              <div>
                <div className="genres">
                  <p>genres:</p>{" "}
                  {element.genres.map((ele,i) => {
                    if (ele.name !== "Massively Multiplayer") {
                      return (
                        <div key={i}>
                          <p> {ele.name}</p>{" "}
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="gamesdetalis">
                  <p className="relased">{`Game rate: ${element.rating}`}</p>
                  <p>{`released:${element.released}`} </p>
                  <p className="playtime">{`playtime:${element.playtime}`}</p>
                </div>
              </div>
            </div>
          </div>
        );
      }
    });
    games = list;
  } else if (filter === "FilterbyPlatform") {
    const list = getapigames.map((element,index) => {
      return element.parent_platforms.map((ele) => {
        if (ele.platform.name === target && element.name != "Limbo") {
          return (
            <div key={index} className="mainCardsDiv">
              <h2 className="gamename">{element.name}</h2>
              <img src={element.background_image} className="gamesimg"></img>
              <div className="gamedetalis">
                <div className="genres">
                  <p>genres:</p>{" "}
                  {element.genres.map((ele) => {
                    if (ele.name !== "Massively Multiplayer") {
                      return (
                        <div>
                          <p> {ele.name}</p>{" "}
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="gamesdetalis">
                  <p className="relased">{`Game rate: ${element.rating}`}</p>
                  <p>{`released:${element.released}`} </p>
                  <p className="playtime">{`playtime:${element.playtime}`}</p>
                </div>
              </div>
            </div>
          );
        }
      });
    });
    games = list;
  } else if (filter === "filterBygenres") {
    const list = getapigames.map((element,index) => {
      return element.genres.map((ele) => {
        if (ele.name === target && element.name != "Limbo") {
          return (
            <div key={index} className="mainCardsDiv">
              <h2 className="gamename">{element.name}</h2>
              <img src={element.background_image} className="gamesimg"></img>
              <div className="gamedetalis">
                <div className="genres">
                  <p>genres:</p>{" "}
                  {element.genres.map((ele) => {
                    if (ele.name !== "Massively Multiplayer") {
                      return (
                        <div>
                          <p> {ele.name}</p>{" "}
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="gamesdetalis">
                  <p className="relased">{`Game rate: ${element.rating}`}</p>
                  <p>{`released:${element.released}`} </p>
                  <p className="playtime">{`playtime:${element.playtime}`}</p>
                </div>
              </div>
            </div>
          );
        }
      });
    });
    games = list;
  }

  if (filter === "search") {
    const myGameslist =
      getMyGames &&
      getMyGames.map((element,index ) => {
        let gamename = element.gamename.toLowerCase();
        if (gamename.includes(search)) {
          return (
            <div key={index} className="myCardsDiv">
              <h2 className="gamename">{element.gamename}</h2>
              <img src={element.image} className="gamesimg"></img>
              <div className="gamedetali">
                <div className="gamedetalischild">
                  <div className="genres">
                    <p>genres:</p>{" "}
                    {element.genres.map((ele) => {
                      if (ele !== "Massively Multiplayer") {
                        return (
                          <div>
                            <p> {ele}</p>{" "}
                          </div>
                        );
                      }
                    })}
                  </div>
                  <div className="gamesdetalis">
                    <p className="relasedd">{`Game rate: ${element.rate}`}</p>
                    <p>{`released:${element.released}`} </p>
                    <p className="playtime">{`playtime:${element.playtime}`}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      });
    mygames = myGameslist;
  } else if (filter === "All") {
    const myGameslist =
      getMyGames &&
      getMyGames.map((element,index ) => {
        return (
          <div key={index} className="myCardsDiv">
            <h2 className="gamename">{element.gamename}</h2>
            <img src={element.image} className="gamesimg"></img>
            <div className="gamedetali">
              <div className="gamedetalischild">
                <div className="genres">
                  <p>genres:</p>{" "}
                  {element.genres.map((ele) => {
                    if (ele !== "Massively Multiplayer") {
                      return (
                        <div>
                          <p> {ele}</p>{" "}
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="gamesdetalis">
                  <p className="relasedd">{`Game rate: ${element.rate}`}</p>
                  <p>{`released:${element.released}`} </p>
                  <p className="playtime">{`playtime:${element.playtime}`}</p>
                </div>
              </div>
            </div>
          </div>
        );
      });
    mygames = myGameslist;
  } else if (filter === "FilterbyPlatform") {
    const myGameslist =
      getMyGames &&
      getMyGames.map((element,index) => {
        return element.wherefound.map((ele) => {
          if (ele === target) {
            return (
              <div key={index} className="myCardsDiv">
                <h2 className="gamename">{element.gamename}</h2>
                <img src={element.image} className="gamesimg"></img>
                <div className="gamedetali">
                  <div className="gamedetalischild">
                    <div className="genres">
                      <p>genres:</p>{" "}
                      {element.genres.map((ele) => {
                        if (ele !== "Massively Multiplayer") {
                          return (
                            <div>
                              <p> {ele}</p>{" "}
                            </div>
                          );
                        }
                      })}
                    </div>
                    <div className="gamesdetalis">
                      <p className="relasedd">{`Game rate: ${element.rate}`}</p>
                      <p>{`released:${element.released}`} </p>
                      <p className="playtime">{`playtime:${element.playtime}`}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        });
      });
    mygames = myGameslist;
  } else if (filter === "filterBygenres") {
    const myGameslist =
      getMyGames &&
      getMyGames.map((element ,index) => {
        return element.genres.map((ele) => {
          if (ele === target) {
            return (
              <div key={index} className="myCardsDiv">
                <h2 className="gamename">{element.gamename}</h2>
                <img src={element.image} className="gamesimg"></img>
                <div className="gamedetali">
                  <div className="gamedetalischild">
                    <div className="genres">
                      <p>genres:</p>{" "}
                      {element.genres.map((ele,i) => {
                        if (ele !== "Massively Multiplayer") {
                          return (
                            <div key={i}>
                              <p> {ele}</p>{" "}
                            </div>
                          );
                        }
                      })}
                    </div>
                    <div className="gamesdetalis">
                      <p className="relasedd">{`Game rate: ${element.rate}`}</p>
                      <p>{`released:${element.released}`} </p>
                      <p className="playtime">{`playtime:${element.playtime}`}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        });
      });
    mygames = myGameslist;
  }

  return (
    <div className="main">
      <div className="searchinput">
        <input
          placeholder="Search"
          className="searchinput"
          onChange={(e) => {
            if (!e.target.value) {
              Setfilter("All");
            } else {
              Setfilter("search");
              Setsearch(e.target.value);
            }
          }}
        ></input>
      </div>
      <div className="mainGamelist">
        <div className="mainbuttons">
          <button
            className="buttons"
            onClick={() => {
              Setfilter("All");
            }}
          >
            All
          </button>

          <button
            className="buttons"
            onClick={(e) => {
              Setfilter("FilterbyPlatform");
              Settarget("PC");
            }}
          >
            <i className="fab fa-windows"></i> <p>PC</p>
          </button>
          <button
            className="buttons"
            onClick={(e) => {
              Setfilter("FilterbyPlatform");
              Settarget("PlayStation");
            }}
          >
            <i className="fab fa-playstation"></i>
            <p>PlayStation</p>
          </button>
          <button
            className="buttons"
            onClick={(e) => {
              Setfilter("FilterbyPlatform");
              Settarget("Xbox");
            }}
          >
            <i className="fab fa-xbox"></i>
            <p>Xbox</p>
          </button>
          <button
            className="buttons"
            onClick={(e) => {
              Setfilter("FilterbyPlatform");
              Settarget("iOS");
            }}
          >
            <i className="fab fa-app-store-ios"></i>
            <p>iOS</p>
          </button>
          <button
            className="buttons"
            onClick={(e) => {
              Setfilter("FilterbyPlatform");
              Settarget("Nintendo");
            }}
          >
            <i className="fab fa-nintendo-switch"></i>
            <p>Nintendo</p>
          </button>
          <button
            className="buttons"
            onClick={(e) => {
              Setfilter("FilterbyPlatform");
              Settarget("Android");
            }}
          >
            <i className="fab fa-android"></i>
            <p>Android</p>
          </button>

          <button
            className="buttons"
            onClick={(e) => {
              Setfilter("filterBygenres");
              Settarget("Platformer");
            }}
          >
            <img src={itstake} className="iconimg"></img> Platformer
          </button>
          <button
            className="buttons"
            onClick={(e) => {
              Setfilter("filterBygenres");
              Settarget("Action");
            }}
          >
            <img src={adventer} className="iconimg"></img> Action
          </button>
          <button
            className="buttons"
            onClick={(e) => {
              Setfilter("filterBygenres");
              Settarget("Adventure");
            }}
          >
            <img src={thewitcher} className="iconimg"></img> adventure
          </button>
          <button
            className="buttons"
            onClick={(e) => {
              Setfilter("filterBygenres");
              Settarget("Shooter");
            }}
          >
            <img src={warzone} className="iconimg"></img> shooter
          </button>
          <button
            className="buttons"
            onClick={(e) => {
              Setfilter("filterBygenres");
              Settarget("Puzzle");
            }}
          >
            <img src={theword} className="iconimg"></img> puzzle
          </button>
          <button
            className="buttons"
            onClick={(e) => {
              Setfilter("filterBygenres");
              Settarget("RPG");
            }}
          >
            <img src={cyber} className="iconimg"></img> RPG
          </button>
        </div>
        <div className="test">
          {mygames}
          {games}
        </div>
      </div>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
        integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
        crossOrigin="anonymous"
      ></link>
    </div>
  );
};

export default GetGamesList;
