console.log("Welcome to spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Love Me Like You do", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Tera Fitoor ~ Arijit Singh ", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Insane ~ AP Dhillon", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Boombayah ~ Black Pink", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Dynamite ~ BTS", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Liggi ~ Ritviz", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Jeet ~ Ritviz", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Waalian ~ Harnoor ", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Haaye Oye ~ Ash King ", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Unstoppable ~ Sia", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

// songItems.forEach((element,i) => {
//     console.log(element,i);
//     element.getElementsByTagName("img")[0].src = songs[i].coverPath;
//     element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
// });


songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    calculateTime(songs[i].filePath).then(timestamp => {
      element.getElementsByClassName("timestamp")[0].innerText = timestamp;
    });
  });
  
  function calculateTime(filePath) {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.src = filePath;
      audio.addEventListener("loadedmetadata", () => {
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60);
        const timestamp = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        resolve(timestamp);
      });
      audio.addEventListener("error", () => {
        reject("00:00");
      });
      audio.load();
    });
  }
  

// handle play/pause click
masterPlay.addEventListener('click' , ()=>{
    if(audioElement.paused || audioElement.currentTime <=0 ){
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    makeAllPlays(); // Update all songItemPlay buttons to "play" state
    
    gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    makeAllPlays(); // Update all songItemPlay buttons to "play" state
    
    gif.style.opacity = 0;
    }
});


// listen to events
audioElement.addEventListener('timeupdate' ,()=> {
    console.log('timeupdate');
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value=progress;
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})


const makeAllPlayss = ()=> {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
        });
}

const makeAllPlays = () => {
    const isPlaying = !audioElement.paused && audioElement.currentTime > 0;
  
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
      if (index === songIndex) {
        if (isPlaying) {
          element.classList.remove('fa-circle-play');
          element.classList.add('fa-circle-pause');
        } else {
          element.classList.remove('fa-circle-pause');
          element.classList.add('fa-circle-play');
        }
      } else {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
      }
    });
  };
  

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e) =>{

        if(e.target.classList.contains('fa-circle-play')){
            makeAllPlayss();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        }
        else{
            makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-pause');
        e.target.classList.add('fa-circle-play');

        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.pause();
        gif.style.opacity = 0;
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        }
    })
})



document.getElementById('next').addEventListener('click',() => {
    if(songIndex >= 9)
    songIndex = 0;
    else
    songIndex += 1;
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

document.getElementById('previous').addEventListener('click',() => {
    if(songIndex <= 0)
    songIndex = 0;
    else
    songIndex -= 1;
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

