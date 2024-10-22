console.log('hi let write js');
let currentsong= new Audio();
let songs
let currentfolder;
async function takesong(folder){
    currentfolder=folder;
    let a= await fetch(`http://127.0.0.1:3000/songs/${folder}/`);
    // console.log(a);
    let response= await a.text()
    // console.log(response);
    let div = document.createElement("div");
    div.innerHTML=response;
    let songlink=div.getElementsByTagName("a")
    // console.log(songlink);
    songs=[]
    for (let index = 0; index < songlink.length; index++) {
        const element = songlink[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1])
        }
    }
     let songsname=document.querySelector(".Songsname").getElementsByTagName("ul")[0]
     songsname.innerHTML=""
    for (const song of songs) {           
        songsname.innerHTML=songsname.innerHTML + `<li>
                       <img src="img/music.svg">
                        <div class="songinfo">
                            <div class="song-name">
                            ${song.replaceAll("%20"," ")}
                            </div>
                            <div class="artist">
                               kartavya 
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="44" height="44" color="#f5eded" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="0" fill="#1fdf64" />
                        <path d="M15.4531 12.3948C15.3016 13.0215 14.5857 13.4644 13.1539 14.3502C11.7697 15.2064 11.0777 15.6346 10.5199 15.4625C10.2893 15.3913 10.0793 15.2562 9.90982 15.07C9.5 14.6198 9.5 13.7465 9.5 12C9.5 10.2535 9.5 9.38018 9.90982 8.92995C10.0793 8.74381 10.2893 8.60868 10.5199 8.53753C11.0777 8.36544 11.7697 8.79357 13.1539 9.64983C14.5857 10.5356 15.3016 10.9785 15.4531 11.6052C15.5156 11.8639 15.5156 12.1361 15.4531 12.3948Z" stroke="black" stroke-width="1.5" stroke-linejoin="round" />
                        </svg>
                        </li>`
    }
    // library song to play 
    Array.from(document.querySelector(".Songsname").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click",element=>{
            console.log(e.querySelector(".song-name").innerHTML);  
            playmusic(e.querySelector(".song-name").innerHTML.trim());                  
        }) 
    })
    return songs
}
// display albums
async function displayalbums(){
    let a= await fetch(`http://127.0.0.1:3000/songs/`);
    let response= await a.text()
    let div = document.createElement("div");
    div.innerHTML=response;
    let anchor= div.getElementsByTagName("a")
    console.log(response);
    let array=Array.from(anchor)
        for (let index = 0; index < array.length; index++) {
            const e = array[index];
        
        if(e.href.includes("\songs")){
            let folder =e.href.split("/").slice(-2)[0];
            let a= await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`);
            let response= await a.json()
            console.log(response);
            cardcontainer=document.querySelector(".card-container");
            cardcontainer.innerHTML=cardcontainer.innerHTML+`<div class="card" data-folder="${folder}">
            <div class="playbutton">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="44" height="44" color="#f5eded" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="0" fill="#1fdf64" />
                    <path d="M15.4531 12.3948C15.3016 13.0215 14.5857 13.4644 13.1539 14.3502C11.7697 15.2064 11.0777 15.6346 10.5199 15.4625C10.2893 15.3913 10.0793 15.2562 9.90982 15.07C9.5 14.6198 9.5 13.7465 9.5 12C9.5 10.2535 9.5 9.38018 9.90982 8.92995C10.0793 8.74381 10.2893 8.60868 10.5199 8.53753C11.0777 8.36544 11.7697 8.79357 13.1539 9.64983C14.5857 10.5356 15.3016 10.9785 15.4531 11.6052C15.5156 11.8639 15.5156 12.1361 15.4531 12.3948Z" stroke="black" stroke-width="1.5" stroke-linejoin="round" />
                    </svg>
                    </div>
                    <img src="/songs/${folder}/cover.jpg">
                    <h3>${response.title}</h3>
                    <p>${response.title}</p>
                    </div>`
                }
            }
            
            Array.from(document.getElementsByClassName("card")).forEach(e=>{
                console.log(e)
                e.addEventListener("click",async iteam=>{
                    console.log(iteam,iteam.currentTarget.dataset);
                    songs= await takesong(`/${iteam.currentTarget.dataset.folder}`);
                                
                })
            })
        }

const playmusic=(track,pause=false)=>{
    currentsong.src=`/songs/`+track
    if(!pause){
        currentsong.play();
        document.querySelector(".play").src="img/pause.svg"
    }
    document.querySelector(".song-info").innerHTML=track;
    document.querySelector(".time").innerHTML=""

}

function secondsToMinutesAndSeconds(totalSeconds) {
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = Math.floor(totalSeconds % 60);

    // Add leading zeros if necessary
    var minutesStr = minutes < 10 ? '0' + minutes : minutes;
    var secondsStr = seconds < 10 ? '0' + seconds : seconds;

    return minutesStr + ':' + secondsStr;
}
async function main(){
    await takesong("/k");
    // playmusic(songs[0].replaceAll("%20"," "),true)
    playmusic(decodeURI(songs[0]),true)
    displayalbums();
   

    play.addEventListener("click",()=>{
        if(currentsong.paused){
            currentsong.play()
            play.src="img/pause.svg"
        }
        else{
            currentsong.pause()
            play.src="img/play.svg"
        }
    })
    currentsong.addEventListener("timeupdate",()=>{
        // console.log(currentsong.currentTime,currentsong.duration);
        document.querySelector(".time").innerHTML=`${secondsToMinutesAndSeconds(currentsong.currentTime)}/${secondsToMinutesAndSeconds(currentsong.duration)}`        
        document.querySelector(".circle").style.left=(currentsong.currentTime/currentsong.duration)*100+"%"
        // console.log((currentsong.currentTime/currentsong.duration)*100+"%");
        
    })
    document.querySelector(".seekbar").addEventListener("click",e=>{
        let percentage=(e.offsetX/e.target.getBoundingClientRect().width)*100
        document.querySelector(".circle").style.left=percentage +"%"; 
        currentsong.currentTime=((currentsong.duration)*percentage)/100;
    })

    document.querySelector(".hamburger").addEventListener("click",e=>{
        document.querySelector(".left").style.left="0"; 
        // document.querySelector(".left").setAttribute("style","width:488px")
    })

    document.querySelector(".closeimg").addEventListener("click",e=>{
        document.querySelector(".left").style.left="-100%"; 
    })

    pervious.addEventListener("click",()=>{
        console.log(currentsong);
        let index=songs.indexOf((currentsong.src.split("/").slice(-1)[0]))
        // console.log((currentsong.src.split("/").slice(-1)[0]));
        console.log(index);
        if((index-1)>=0){
            playmusic(songs[index-1])
        }
            })
    next.addEventListener("click",()=>{
        console.log(currentsong);
        let index=songs.indexOf((currentsong.src.split("/").slice(-1)[0]))
        // console.log((currentsong.src.split("/").slice(-1)[0]));
        console.log(index);
        if((index+1)>=length){
            playmusic(songs[index+1])
        }
    })
    document.querySelector(".volume-range").addEventListener("click",(e)=>{
        console.log(e.target.value)
        console.log('hu');
         currentsong.volume=parseInt(e.target.value)/100
       })
    document.querySelector(".sound>img").addEventListener("click",e=>{
        if(e.target.src.includes("img/volume.svg")){
            e.target.src=e.target.src.replace("img/volume.svg","img/mute.svg")
            currentsong.volume=0;
            document.querySelector(".sound").getElementsByTagName("input")[0].value = 0;
        }
        else{
            e.target.src=e.target.src.replace("img/mute.svg","img/volume.svg")
            currentsong.volume=0.50;
            document.querySelector(".sound").getElementsByTagName("input")[0].value = 50;
        }
    })
}
main()
