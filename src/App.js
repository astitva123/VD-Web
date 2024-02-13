/* eslint-disable jsx-a11y/alt-text */
import logo from "./logo.svg";
import "./App.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import kittyOne from "./kitty1.jpg";
import kittyTwo from "./kitty2.jpg";
import song from "./yellow.mp3";
import useSound from "use-sound";
import Confetti from "react-confetti";

function App() {

  const [leftKitty, setLeftKitty] = useState(-10);
  const [rightKitty, setRightKitty] = useState(10);
  const [displayOne, setDisplayOne] = useState(false)
  const [displayTwo, setDisplayTwo] = useState(false)
  const [clearDrift, setClearDrift] = useState(false);
  const [playSound] = useSound(song);

  useEffect(() => {
    const timeoutOne = setTimeout(() => {
      setDisplayOne(true);
    }, 2000)
  
    let startDrifting = setInterval(() => {
      // if(clearDrift) {
      //   console.log("CLEAR IT!!")
      //   clearInterval(startDrifting);
      // }
      if(displayTwo) {
        // console.log("HELLO")
        setLeftKitty(leftKitty-20);
        setRightKitty(rightKitty+20);
      }
    }, 550);
  
    const timeoutTwo = setTimeout(() => {
      setDisplayTwo(true);
    }, 6000)
    return () => {
      clearInterval(startDrifting);
      clearTimeout(timeoutOne)
      clearTimeout(timeoutTwo);
    }
  });
  
  const bringTogether = () => {
    setLeftKitty(leftKitty+5);
    setRightKitty(rightKitty-5);
    if(leftKitty >= rightKitty) {
      // console.log("CLEAR")
      playSound();
      setClearDrift(true);
    }
  }
  
  return (
    <div className="App">
      {!clearDrift && <motion.header layout className="App-header">
          <motion.h1 layout>Hello My love</motion.h1>
          {displayOne && <motion.h2 layout animate={{}}>I know I've asked you this already but i thought this idea was really cute, so here goes</motion.h2>}
          {displayTwo && <motion.h3 layout animate={{}}>I'm gonna ask you to be my valentine and give you a choice of YES/NO.<br></br> You can choose to go with NO but KNOW this, that'll cause these two kittens you see below to drift apart FOREVER.</motion.h3>}
          <motion.div className="Row">
            <motion.img animate={{opacity: displayTwo ? 1 : 0, x:leftKitty}} src={kittyOne} className="kittyPic"></motion.img>
            <motion.img animate={{opacity: displayTwo ? 1 : 0, x:rightKitty}} src={kittyTwo} className="kittyPic"></motion.img>
          </motion.div>
          <div className="Row">
            <motion.div onClick={bringTogether} className="clickable" animate={{opacity: displayTwo ? 1 : 0}}>YES</motion.div>
            <motion.div className="clickable" animate={{opacity: displayTwo ? 1 : 0}}>NO</motion.div>
          </div>
      </motion.header>}
      {
        clearDrift && 
        <Confetti
        // width={width}
        // height={height}
        />  
      }
      {
        clearDrift && 
        <header className="App-header">
          <div className="big-heading">HAPPY VALENTINE'S DAY LOVE!!</div>
          <h1>Hoping this made your day</h1>
        </header>
      }
    </div>
  );
}

export default App;
