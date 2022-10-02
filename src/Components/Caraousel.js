import React, { useState, useEffect } from "react";
import './Caraousel.css';

function Caraousel(props) {
  const [currImg, setCurrImg] = useState(0);
  const [chapter, setChapter] = useState([]);
  const [background, setBackground] = useState(
    "https://thumbs.dreamstime.com/b/click-here-button-hand-icon-click-here-button-hand-icon-isolated-white-background-135876616.jpg"
  );

  useEffect(() => {
    setCurrImg(0);
    setChapter([]);
    setBackground(
      "https://thumbs.dreamstime.com/b/click-here-button-hand-icon-click-here-button-hand-icon-isolated-white-background-135876616.jpg"
    );

    const url = "http://18.177.140.79:8080/chapters/";

    const fetchChapter = async () => {
      try {
        const response = await fetch(url + `${props.mangachapter}/`);
        const json = await response.json();
        setChapter(json.pages);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchChapter();

    return () => {};
  }, [props.mangachapter, props.route]);


  const css = {
    backgroundImage: `url(${background})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <div>
      <div>
        <div class="buttons" style={css}>
          <div
            className="left"
            onClick={() => {
              currImg < chapter.length && setCurrImg(currImg + 1);
              setBackground(`${chapter[currImg].image.file}`);
            }}
          ></div>
          <div
            className="right"
            onClick={() => {
              currImg > 0 && setCurrImg(currImg - 1);
              setBackground(`${chapter[currImg].image.file}`);
            }}
          ></div>
        </div>
      </div>
      <h2 style={{textAlign: 'center'}}>
        {currImg}/{chapter.length}
      </h2>
    </div>
  );
}

export default Caraousel;
