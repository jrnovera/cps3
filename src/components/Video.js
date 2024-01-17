import React from "react";

const Video = () => {
  return (
    <video
      autoPlay
      loop
      muted
      style={{
        width: "100%", // Adjust the width as needed
        height: "auto", // Maintain aspect ratio
        display: "block",
        margin: "auto",
      }}>
      <source
        src="https://www.apple.com/105/media/us/mac/family/2023/1b2bbf5c-ddc5-44a1-9dfb-7a51c49143fa/anim/welcome/xlarge.mp4"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
