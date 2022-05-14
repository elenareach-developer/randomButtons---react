import React, {useState, useEffect}from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import Button from './Button';
import NavigationIcon from '@material-ui/icons/Navigation';



export default function RendomButton({classes}) {

  
    const [customButton, setCustomButton]  = useState([]);
    const [stop, setStop] = useState(true);
    const [currentState, setCurrentState] = useState(["wait",0]);
  
    const onStop=()=>{ setStop(!stop) }
    const genarateNumber = ()=>{
      let num = Math.floor(Math.random() * 900);
      let buttonGeneration = ["wait", num];
      if(num%2===1){
        if(1<num && num<300){
          buttonGeneration[0]  = "greenClass";
        }
       if(300<num && num<600){
        buttonGeneration[0] = "redClass";
       }
       if(600<num && num<900){
        buttonGeneration[0]  = "blueClass";
       }
     }
     setCurrentState(buttonGeneration);
     return buttonGeneration;
     }
    const timeFunc = ()=> setTimeout(()=>{
      let buttonGeneration= genarateNumber();
      if(buttonGeneration[0]!=="wait"){
        setCustomButton([...customButton, buttonGeneration])
      }else{
       return timeFunc();
      }
  
    }, 2000)
    
  
  useEffect(()=>{
    if(stop){
      timeFunc();
    }else{
      clearTimeout(timeFunc)
    }
  },[customButton, stop])
  
    return (
      
  
        <Paper square className={classes.paper}>
          <Typography className={classes.text} variant="h5" gutterBottom>
            Current number: { currentState[1]} {currentState[0] === "wait"? " wait":""}
          </Typography>
          <List className={classes.list}>
          {customButton.map((e,index)=>{
                    return <Button backgroundClass={e[0]} id={index} key={index} text={e[1]}/>
                  })}
          </List>
          <Fab variant="extended" onClick={onStop} className={classes.fabButton}>
              <NavigationIcon className={classes.extendedIcon} />
                {stop? "STOP":"RUN"}
            </Fab>
        </Paper>
    
    );
  }