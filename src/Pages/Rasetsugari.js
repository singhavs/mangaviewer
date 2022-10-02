import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Caraousel from "../Components/Caraousel";

export default function Rasetsugari() {
  const [manga, setManga] = useState([]);
  const [book, setBook] = useState([]);
  const [mangachapter, setMangaChapter] = useState(8);
  const route = "rasetsugari";

  useEffect(() => {
    const url = "http://18.177.140.79:8080/books/";

    const fetchManga = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setManga(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchBook = async () => {
      try {
        const response = await fetch(url + "1/");
        const json = await response.json();
        setBook(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchManga();
    fetchBook();
    return () => {};
  }, []);

  const handleClick = (event) => {
    setMangaChapter(event);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {manga.map((item) => (
          <div>
            <ul style={{ listStyleType: "none", display: "flex" }}>
              <li>
                <Link to={`/${item.title}/`}>
                  <button
                    style={{
                      backgroundColor:
                        `${route}` === `${item.title}` ? "darkgreen" : "",
                      color: `${route}` === `${item.title}` ? "white" : "black",
                      border:
                      `${route}` === `${item.title}` ? "2px solid gold" : "",
                    }}
                    onClick={handleClick}
                  >
                    {item.title}
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {manga.map((item) =>
          item.chapter_ids.map((chapter) =>
            route === item.title ? (
              <button
                onClick={() => handleClick(chapter)}
                style={{
                  backgroundColor:
                    `${mangachapter}` === `${chapter}` ? "darkgreen" : "",
                  color: `${mangachapter}` === `${chapter}` ? "white" : "black",
                  border:
                      `${mangachapter}` === `${chapter}` ? "2px solid gold" : "",
                }}
              >
                {chapter}
              </button>
            ) : (
              <div></div>
            )
          )
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Caraousel route={route} mangachapter={mangachapter} />
      </div>
    </div>
  );
}
