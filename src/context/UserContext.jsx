import React, { createContext, useState } from 'react'
export const datacontext=createContext()


function UserContext({children}){
  let [speaking,setSpeaking]=useState(false)
  let[prompt,setPrompt]=useState("listening...")
  let [response,setResponse]=useState(false)


  function speak(text){
let text_speak=new SpeechSynthesisUtterance(text)
text_speak.volume=1;
text_speak.rate=1;
text_speak.pitch=1;
text_speak.lang="en-GB"
window.speechSynthesis.speak(text_speak)
  }
  
async function aiResponse(prompt){
let text=await run(prompt)
let cleanedText = text.replace(/(\*\*|\*)/g, ""); 
  let newText = cleanedText.replace(/google/gi, "Anushree Chouhan");
setPrompt(newText)
speak(newText)
setResponse(true)
setTimeout(()=>{
  setSpeaking(false)
},4000)

}

let speechRecognition=window.SpeechRecognition ||window.webkitSpeechRecognition
let recognition=new speechRecognition()
recognition.onresult=(e)=>{
  let currentIndex=e.resultIndex
  let transcript=e.results[currentIndex][0].transcript
setPrompt (transcript)
takeCommand(transcript.toLowerCase())

}
function takeCommand(command){
  if(command.includes("open") && command.includes("youtube")){
    window.open("https://www.youtube.com/","_blank")
    speak("opening Youtube")
    setResponse(true)
    setPrompt("opening Youtube...")
    setTimeout(()=>{
      setSpeaking(false)
    },5000)
    
  }else  if(command.includes("open") && command.includes("google")){
    window.open("https://www.google.com/","_blank")
    speak("opening Google")
    setResponse(true)
    setPrompt("opening Google...")
    setTimeout(()=>{
      setSpeaking(false)
    },5000)
    
  }
  else  if(command.includes("open") && command.includes("instagram")){
    window.open("https://www.instagram.com/","_blank")
    speak("opening instagram")
    setResponse(true)
    setPrompt("opening instagram...")
    setTimeout(()=>{
      setSpeaking(false)
    },5000)
    
  }
  else if(command.includes("time")){
    let time=new Date().toLocaleString(undefined,
      {
hour:"numeric",minute:"numeric"
      }
    )
    speak(time)
    setResponse(true)
    setPrompt(time)
    setTimeout(()=>{
      setSpeaking(false)
    },5000)
  }
  else if(command.includes("date")){
    let date=new Date().toLocaleString(undefined,
      {
date:"numeric",month:"short"
      }
    )
    speak(date)
    setResponse(true)
    setPrompt(date)
    setTimeout(()=>{
      setSpeaking(false)
    },5000)
  }
  else  if(command.includes("open") && command.includes("facebook")){
    window.open("https://www.facebook.com/","_blank")
    speak("opening facebook")
    setPrompt("opening facebook...")
    setTimeout(()=>{
      setSpeaking(false)
    },5000)
    
  }
  else if(command.includes("open") && command.includes("spotify")){
    window.open("https://www.spotify.com/","_blank")
    speak("opening spotify")
    setPrompt("opening spotify...")
    setTimeout(()=>{
      setSpeaking(false)
    },5000)
  }
  else if(command.includes("open") && command.includes("netflix")){
    window.open("https://www.netflix.com/","_blank")
    speak("opening netflix")
    setPrompt("opening netflix...")
    setTimeout(()=>{
      setSpeaking(false)
    },5000)
  }
  else{
    aiResponse(command)
  }
}
    let value={
      recognition,
      speaking,
      setSpeaking,
      prompt,
      setPrompt,
      response,
      setResponse

    }
 
  return (
    <div>
        <datacontext.Provider value={value}>
        {children}
        </datacontext.Provider>
    
    </div>
  )
}

export default UserContext
