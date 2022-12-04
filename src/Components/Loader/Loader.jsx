import React from "react";
// import { ClimbingBoxLoader } from "react-spinners";
// import { Theme } from "../../contexts/Theme";

const imgBBDD = require.context('../../img', true);

const Loader = () => {

    // const { themeColor } = useContext(Theme);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "98.5vw",
          height: "calc(100vh - 50px)",
        }}
      >
        {/* <ClimbingBoxLoader size= {30}/> */}
        <iframe
          title="cargandoGif"
          src={imgBBDD("./cargandoGif.gif")}
          width="480"
          height="480"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
          alt="item"
        ></iframe>
      </div>
    );
};

export default Loader;