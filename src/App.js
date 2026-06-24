// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
// 1. TODO - Import required model here
// e.g. import * as tfmodel from "@tensorflow-models/tfmodel";
import * as cocossd from "@tensorflow-models/coco-ssd";//this is the model we are using for object detection
import Webcam from "react-webcam";
import "./App.css";
// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";
import { drawRect } from "./utilities";//this is the utility function that draws the rectangle around the detected object

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network 
    // e.g. const net = await cocossd.load();
    const net = await cocossd.load();//this loads the model
    
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      // e.g. const obj = await net.detect(video);
      const obj = await net.detect(video);//this detects the objects in the video
      console.log(obj);

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  
      drawRect(obj, ctx);//this draws the rectangle around the detected object
    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
  <div className="App">

    <div className="live-badge">
      ● Live Detection
    </div>

    <div className="title-section">
      <h1>AI Object Detection</h1>
      <p>Real-Time Computer Vision using TensorFlow.js</p>
    </div>

    <div className="stats-container">
      <div className="stat-card">
        <h3>Objects Detected</h3>
        <span>1</span>
      </div>

      <div className="stat-card">
        <h3>Model</h3>
        <span>COCO-SSD</span>
      </div>

      <div className="stat-card">
        <h3>Status</h3>
        <span>Active</span>
      </div>
    </div>

    <div className="camera-wrapper">
      <Webcam
        ref={webcamRef}
        muted={true}
        className="webcam"
      />

      <canvas
        ref={canvasRef}
        className="canvas"
      />
    </div>

    <div className="detection-status">
      AI is actively detecting objects in real-time
    </div>

    <div className="footer">
      Powered by React + TensorFlow.js
    </div>

  </div>
  );
}

export default App;
