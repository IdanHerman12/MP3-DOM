/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
function playSong(songId) {
    // Your code here
}

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId) {
    // Your code here
}

/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong({ title, album, artist, duration, coverArt }) {
    // Your code here
    console.log(title, album, artist, duration, coverArt)
    const  id=randomID(player.songs)
    const format=duration.split(":")
    let minutes=parseInt(format.slice(0,1))
    let seconds=parseInt(format.slice(1))
    duration=(minutes*60)+seconds
    let song={
      "id":id,
      "title":title,
      "album":album,
      "artist":artist,
      "duration": duration,
      "coverArt":coverArt
    }
    player.songs.push(song) 
    alert("songs added")
    generateSongs()
    // return player.songs[player.songs.length-1].id
  }


/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
    // Your code here
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    // Your code here
    const titleEl=document.querySelector("#inputs > input:nth-child(1)").value
        const albumEl=document.querySelector("#inputs > input:nth-child(2)").value
        const artistEl=document.querySelector("#inputs > input:nth-child(3)").value
        let durationEl=document.querySelector("#inputs > input:nth-child(4)").value
        console.log(durationEl)
        const coverArtEl=document.querySelector("#inputs > input:nth-child(5)").value
        console.log({titleEl,albumEl,artistEl,durationEl,coverArtEl})
        addSong({title:titleEl,album:albumEl,artist:artistEl,duration:durationEl,coverArt:coverArtEl})
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const song=arguments[0]
    const children = songList(song)
    const classes = ["song"]
    const attrs = {id:(`song_${id}`)}
    const eventListeners = {}
    return createElement("div", children, classes, attrs, eventListeners)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
 function createPlaylistElement({ id, name, songs }) {
    const playlist=arguments[0]
    const children = playPlaylist(playlist)
    const classes = ["playlist"]
    const attrs = {}
    const eventListeners = {}
    return createElement("div", children, classes, attrs, eventListeners)
}
//create the buttons for paly and delete songs
function createPlayDelete(){
    for(let i=0;i<songsExist;i++){
        const id=player.songs[i].id
        let x=document.querySelector(`#song_${id}`)
x.appendChild(createElement("button",["play"],["play-button"],{}))
x.appendChild(createElement("button",["delete"],["delete-button"],{}))
}
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"}, {click: (...) => {...}})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 * @param {Object} eventListeners - the event listeners on the element
 */
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
    // Your code here
    let element= document.createElement(tagName)
   classes.forEach(c =>element.classList.add(c))
   const attribute=Object.keys(attributes)
   for(let i=0;i<attribute.length;i++){
       element.setAttribute(attribute[i],attributes[attribute[i]])  
   }
   for(let i=0;i<children.length;i++){
    element.append(children[i])
   }
    return  element
}


/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
let songsExist=0;
function generateSongs() {
    // Your code here
    player.songs.sort(sortArray);
    const x=document.querySelector("#songs>.list")
for(let i=songsExist;i<player.songs.length;i++){
x.appendChild(createSongElement(player.songs[i]))
songsExist++
}
}

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generatePlaylists() {
    // Your code here
    player.playlists.sort(sortArray);
    const x=document.querySelector("#playlists>.list");
for(let i=0;i<player.playlists.length;i++){  
x.appendChild(createPlaylistElement(player.playlists[i]));
}
}

// Creating the page structure
generateSongs()
createPlayDelete()
generatePlaylists()

// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)


//create the list of songs
function songList(song){
    const list=[]
    for(let key in song){
         if(key.toString()!=='coverArt' && key.toString()!=='duration'){
        const span=document.createElement('span');
        span.innerText=`${key}: ${song[key]}`;
        list.push(span)
    }
     else if(key.toString()==="duration"){
        const span=document.createElement('span');
        let duration=convertDuriation(song[key])
        span.innerText=`${key}: ${duration}`;
        list.push(span)
    }
    else{
        const img= createElement('img',[],["album-art"],{src:song[key]})
        const left=document.createElement('div')
        left.appendChild(img)
        list.push(left)
    }
    }
    return list
    }
    //  create list of playlists
    function playPlaylist(playlist){
        const list=[]
        let sumDuration =playlistDuration(playlist)
        for(let key in playlist){
            if(key.toString()!=="songs"){
               const span=document.createElement('span')
                   span.innerText=`${key}: ${playlist[key]}`;
                      list.push(span)
                    }
                    else{
                        const span=document.createElement("span")
                        span.innerText=`number of songs: ${playlist.songs.length}`
                        list.push(span)
          
                    }
        }
        const span=document.createElement("span")
        sumDuration=convertDuriation(sumDuration)
        span.innerText=`duration: ${(sumDuration)}`;
        list.push(span)
        return list 
        }
    
    // sorting an array by rhe alphabetic order
    function sortArray(a, b){
        if(a.hasOwnProperty("title")){
          return a.title.localeCompare(b.title);
        }
        if(a.hasOwnProperty("name")){
          return a.name.localeCompare(b.name);
        }
    }

    