//Global variables
var i = 0;
var titleText = "Typing Speed Test";
var myText = document.getElementById("my-text");
var resetButton = document.getElementById("reset-button");
var sampleText = document.getElementById("sample-text");
var nwtTotal = document.getElementById("nwtTotal");
var wpmText = document.getElementById("wpm");
var wpmTotal = document.getElementById("wpmTotal");
var appendMinutes = document.getElementById("minutes");
var appendSeconds = document.getElementById("seconds");
var appendTens = document.getElementById("tens")
var minutes = 0;
var seconds = 00; 
var tens = 00;
var Interval;
var sampleTextArray = [
  `She was more like a beauty queen from a movie scene. I said don't mind, but what do you mean, I am the one, who will dance on the floor in the round?
  She said I am the one, who will dance on the floor in the round. She told me her name was Billie Jean, as she caused a scene. Then every head turned with eyes that dreamed of being the one,
  who will dance on the floor in the round.`,
  `Jessie is a friend, yeah I know, he's been a good friend of mine. But lately something's changed that ain't hard to define. Jessie's got himself a girl and I want to make her mine. 
  And she's watching him with those eyes, and she's loving him with that body, I just know it. Yeah, and he's holding her in his arms late, late at night. You know, I wish that I had
  Jessie's girl, I wish that I had Jessie's girl. Where can I find a woman like that?`,
  `I don't know where I'm going, but I sure know where I've been, hanging on the promises in songs of yesterday. And I've made up my mind, I ain't wasting no more time.
  Here I go again, here I go again. Though I keep searching for an answer, I never seem to find what I'm looking for. Oh Lord, I pray you give me strength to carry on
  cause I know what it means to walk along the lonely street of dreams. Here I go again on my own, going down the only road I've ever known, like a drifter I was born to walk alone`,
  `Let us die young or let us live forever. We don't have the power, but we never say never. Sitting in a sandpit, life is a short trip. The music's for the sad man.
  Can you imagine when this race is won? Turn our golden faces into the sun. Praising our leaders, we're getting in tune. The music's played by the madman.
  Forever young, I want to be forever young. Do you really want to live forever? Forever, and ever.`,
  `Clock strikes upon the hour, and the sun begins to fade. Still enough time to figure out, how to chase my blues away. I've done alright up until now, it's the light of day that shows me how.
  And when the night falls, loneliness calls. Oh, I wanna dance with somebody. I wanna feel the heat with somebody. Yeah, I wanna dance with somebody. With somebody who loves me.`,
  `Well you're the real tough cookie with a long history of breaking little hearts like the one in me. That's okay, let's see how you do it, put up your dukes, let's get down to it.
  Hit me with your best shot, why don't you hit me with your best shot. Hit me with your best shot, fire away. You come on with it, come on, you don't fight fair. But that's okay, see if I care.
  Knock me down, it's all in vain. I get right back on my feet again.`,
  `We're talking away, I don't know what I'm to say, I'll say it anyway. Today's another day to find you shying away, I'll be coming for your love, okay? Take on me, take me on,
  I'll be gone in a day or two. So needless to say, I'm odds and ends, I'll be stumbling away, slowly learning that life is ok. Say after me, it's no better to be safe than sorry.`,
  `Just a small town girl, living in a lonely world, she took the midnight train going anywhere. Just a city boy, born and raised in South Detroit, he took the midnight train going anywhere.
  A singer in a smokey room, the smell of wine and cheap perfume, for a smile they can share the night, it goes on and on, and on, and on. Strangers, waiting, up and down the boulevard,
  their shadows, searching in the night. Streetlights, people, living just to find emotion, hiding somewhere in the night.`,
  `We're no strangers to love, you know the rules and so do I, a full commitment's what I'm thinking of, you wouldn't get this from any other guy. 
  I just wanna tell you how I'm feeling. Gotta make you understand. Never gonna give you up, never gonna let you down, never gonna run around and desert you, 
  never gonna make you cry, never gonna say goodbye, never gonna tell a lie and hurt you.`,
  `Rising up, back on the street, did my time, took my chances. Went the distance, now I'm back on my feet, just a man and his will to survive. So many times it happens too fast,
  you change your passion for glory. Don't lose your grip on the dreams of the past, you must fight just to keep them alive. It's the eye of the tiger, it's the thrill of the fight, 
  rising up to the challenge of our rival, and the last known survivor, stalks his prey in the night, and he's watching us all with the eye of the tiger.`,
];

window.onload = function() {


  myText.oninput = startTest; 
  myText.onfocus = updateSampleText;


  //title typewriter effect
  function typeWriter() {
    if (i < titleText.length) {
      document.getElementById("title").innerHTML += titleText.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }
  typeWriter();
  

  //Starts the test and stops the test if number of characters typed equals number of characters in sample text
  function startTest() { 
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
    nwtCounter();
      if (sampleText.textContent.length === myText.value.length) {
        finishTest();
      } 
  } 


  //Updates the sample text with random song lyrics from the sample text array
  function updateSampleText() {
    randomSampleText = Math.floor(Math.random() * sampleTextArray.length);
    sampleText.innerHTML = sampleTextArray[randomSampleText];
  } 


  //Counts the number of words typed
  function nwtCounter() {
    let wordsTyped = myText.value.split(" ").length; 
    nwtTotal.innerHTML = wordsTyped++;
  }


  //Calculates the wpm
  function updateWpm() {
    let characterTyped = myText.value.split("").length;
    let sec = appendSeconds.innerHTML;
    let secInt = parseInt(sec, 10);
    let min = appendMinutes.innerHTML;
    let minInt = parseInt(min, 10);

    if (secInt < 59) {
      wpm = Math.round((((characterTyped / 5) / secInt) * 60)); 
    } 
    
    if (minInt === 1){
      wpm = Math.round((characterTyped / 5));
    }

    wpmTotal.innerHTML = wpm; 
  }
  

  //Resets all values
  function resetValues() {  
    characterTyped = 0; 
    myText.disabled = false;
    myText.value = ""; 
    sampleText.textContent = "Click on the area below to start the game";
    nwtTotal.textContent = "";
    wpmTotal.textContent = "";
    appendMinutes.innerHTML = "0";
    appendSeconds.innerHTML = "00";
    appendTens.innerHTML = "00";
    wordsTyped = 0;
    resetButton.style.display = "none"; 
    wpmText.style.display = "none";
    minutes = 0;
    seconds = 00; 
    tens = 00;
  } 


  //Reset Button
  resetButton.onclick = function() {
    resetValues();
  }   


  //Starts the timer and stops it if it reaches the 1 minute mark
  function startTimer() {

    tens++; 

    if(tens < 9) {
      appendTens.innerHTML = "0" + tens;
    }
    
    if (tens > 9) {
      appendTens.innerHTML = tens;
    } 
    
    if (tens > 99) {
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }

    if (seconds < 10) {
      appendSeconds.innerHTML = "0" + seconds;
    }

    if (seconds > 9) {
      appendSeconds.innerHTML = seconds;
    }

    if (seconds > 59) {
      appendSeconds.innerHTML = "0" + 0;
      appendTens.innerHTML = "0" + 0;
      appendMinutes.innerHTML = 1;
      finishTest();
    }
  }
  
  //Finishes the test. Gets called once number of characters typed equals number of characters in sample text or once timer reaches 1 minute
  function finishTest() {
    myText.disabled = true;
    clearInterval(Interval);
    myText.style.color = "black";
    resetButton.style.display = "block";
    wpmText.style.display = "block";
    updateWpm();
  }

}
