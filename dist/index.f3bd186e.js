//NAVIGATION
//hamburger nav toggle
//referenced from https://dev.to/devggaurav/let-s-build-a-responsive-navbar-and-hamburger-menu-using-html-css-and-javascript-4gci
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
hamburger.addEventListener("click", mobileMenu);
function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}
//close hamburger menu when a link is clicked
const navLink = document.querySelectorAll(".nav-link");
navLink.forEach((n)=>n.addEventListener("click", closeMenu)
);
function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}
//onclick show section, hide section
//Dom elements for nav buttons and background
const taskListNav = document.getElementById("tasklist-nav");
const kanbanNav = document.getElementById("kanban-nav");
const stopwatchNav = document.getElementById("stopwatch-nav");
const pomodoroNav = document.getElementById("pomodoro-nav");
const dictionaryNav = document.getElementById("dictionary-nav");
const homeNav = document.querySelector("h1");
//Dom elements for website pages
const taskListPage = document.getElementById("task");
const kanbanPage = document.getElementById("kanban");
const stopwatchPage = document.getElementById("stopwatch");
const pomodoroPage = document.getElementById("pomodoro");
const dictionaryPage = document.getElementById("dictionary");
// Display homepage (hide all pages) when clicking logo title
homeNav.addEventListener("click", function() {
    //hides all pages
    taskListPage.style.display = 'none';
    stopwatchPage.style.display = 'none';
    kanbanPage.style.display = 'none';
    stopwatchPage.style.display = 'none';
    pomodoroPage.style.display = 'none';
    dictionaryPage.style.display = 'none';
}, false);
// Display tasklist
taskListNav.addEventListener("click", function() {
    //shows tasklist
    taskListPage.style.display = 'block';
    //hides other pages
    stopwatchPage.style.display = 'none';
    kanbanPage.style.display = 'none';
    stopwatchPage.style.display = 'none';
    pomodoroPage.style.display = 'none';
    dictionaryPage.style.display = 'none';
}, false);
// Display kanban
kanbanNav.addEventListener("click", function() {
    //shows tasklist
    kanbanPage.style.display = 'block';
    //hides other pages
    taskListPage.style.display = 'none';
    stopwatchPage.style.display = 'none';
    pomodoroPage.style.display = 'none';
    dictionaryPage.style.display = 'none';
}, false);
// Display stopwatch
stopwatchNav.addEventListener("click", function() {
    //shows tasklist
    stopwatchPage.style.display = 'block';
    //hides other pages
    taskListPage.style.display = 'none';
    kanbanPage.style.display = 'none';
    pomodoroPage.style.display = 'none';
    dictionaryPage.style.display = 'none';
}, false);
// Display pomodoro
pomodoroNav.addEventListener("click", function() {
    //shows tasklist
    pomodoroPage.style.display = 'block';
    //hides other pages
    taskListPage.style.display = 'none';
    kanbanPage.style.display = 'none';
    stopwatchPage.style.display = 'none';
    dictionaryPage.style.display = 'none';
}, false);
// Display dictionary
dictionaryNav.addEventListener("click", function() {
    //shows dictionary
    dictionaryPage.style.display = 'block';
    //hides other pages
    taskListPage.style.display = 'none';
    kanbanPage.style.display = 'none';
    stopwatchPage.style.display = 'none';
    pomodoroPage.style.display = 'none';
}, false);
// TASK LIST
// Referenced from https://replit.com/@robdongas/Modular-WebApp-Demo#public/scss/components/tasklist.scss
// Basic form DOM elements
const form = document.getElementById("taskform");
const button = document.querySelector("#taskform > button");
// Selector for the tasklist output
var tasklist = document.querySelector("#tasklist > ul");
var todo = document.getElementById("todo"); //kanban board todo column
// DOM elements for the task input fields
var taskInput = document.getElementById("taskInput");
var dueDateInput = document.getElementById("dueDateInput");
var estimatedTimeInput = document.getElementById("estimatedTimeInput");
var priorityInput = document.getElementById("priorityInput");
var completionStatusInput = document.getElementById("completionStatusInput");
// Form submission event listener
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let task = taskInput.value;
    let dueDate = dueDateInput.value;
    let estimatedTime = estimatedTimeInput.value;
    let priorityRating = priorityInput.options[priorityInput.selectedIndex].value;
    let completionStatus = completionStatusInput.value;
    if (task) addTask(task, dueDate, estimatedTime, priorityRating, completionStatus, false);
});
// Create global array to track tasks
var taskListArray = [];
// Function to add task with user inputs as parameters
function addTask(taskDescription, dueDate, estimatedTime, priorityRating, completionStatus) {
    let d = new Date();
    let dateCreated = d.getFullYear();
    let task = {
        id: Date.now(),
        taskDescription,
        dueDate,
        dateCreated,
        estimatedTime,
        priorityRating,
        completionStatus
    };
    taskListArray.push(task);
    console.log(taskListArray);
    renderTask(task);
}
// Function to display task on screen
function renderTask(task1) {
    // Call function - checks if a task has been added
    updateEmpty();
    // Create HTML elements
    let item = document.createElement("li");
    item.setAttribute('data-id', task1.id);
    item.innerHTML = "<p>" + task1.taskDescription + " | " + task1.dueDate + " | " + task1.estimatedTime + " | " + task1.priorityRating + " | " + task1.completionStatus + "</p>";
    tasklist.appendChild(item);
    // Clone task item to append and show on kanban board because one node cannot exist in multiple doms
    let itemClone = item.cloneNode(true);
    itemClone.classList.add("taskbox");
    todo.appendChild(itemClone);
    // Extra Task DOM elements
    let delButton = document.createElement("button");
    // Replace delete text with delete icon
    // let delButtonText = document.createTextNode("Delete Task");
    // delButton.appendChild(delButtonText);
    delButton.innerHTML = '<i class="fa-solid fa-circle-minus"></i>';
    item.appendChild(delButton);
    // Event Listeners for DOM elements
    delButton.addEventListener("click", function(event) {
        event.preventDefault();
        let id = event.target.parentElement.getAttribute('data-id');
        let index = taskListArray.findIndex((task)=>task.id === Number(id)
        );
        removeItemFromArray(taskListArray, index);
        console.log(taskListArray);
        updateEmpty();
        item.remove(); //removes deleted task in tasklist
        itemClone.remove(); //removes deleted task in kanban
    });
    // Clear the input form
    form.reset();
}
// Function to remove item from array
function removeItemFromArray(arr, index) {
    if (index > -1) arr.splice(index, 1);
    return arr;
}
// Function to hide the 'you haven't added any tasks' text
function updateEmpty() {
    if (taskListArray.length > 0) document.getElementById('emptyList').style.display = 'none';
    else document.getElementById('emptyList').style.display = 'block';
}
//KANBAN
// Make tasks draggable
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
//Allow task to be dropped in column
function allowDrop(ev) {
    ev.preventDefault();
}
//Drops and shows task in column
function drop(ev) {
    ev.preventDefault();
    var data1 = ev.dataTransfer.getData("text");
    ev.currentTarget.appendChild(document.getElementById(data1));
}
// Add new column
// referenced from week 13 tutorial https://codepen.io/sammyHall/pen/KKQqpYR
// an event listener for the 'add column' button which calls the addColumn() function
document.getElementById("addButton").addEventListener("click", addColumn);
// creates a new kanban column when add button is clicked
function addColumn() {
    console.log("button clicked");
    var newColumn = document.createElement("input"); //create column header which user can input text for
    newColumn.type = "text";
    newColumn.classList.add("kanban-block"); //add class to new column to add css
    var newDataColumn = document.createElement("div"); //create column body to store the task data
    newDataColumn.classList.add("kanban-data"); //add class to column data div
    var newKanbanContainer = document.createElement("div"); //create container for column header and body
    newKanbanContainer.classList.add("kanban-container"); //add class to container
    var kBoard = document.getElementById("kanban-board"); //kanban board section
    newKanbanContainer.appendChild(newColumn); //append column header to container
    newKanbanContainer.appendChild(newDataColumn); //append column data to container
    kBoard.append(newKanbanContainer); //add new column to end of list
}
//STOPWATCH
//https://www.codegrepper.com/code-examples/javascript/stopwatch+with+javascript
var x;
var startstop = 0;
/* Function to toggle startstop button */ function startStop() {
    startstop = startstop + 1;
    if (startstop === 1) {
        start();
        document.getElementById("start").innerHTML = "STOP";
    } else if (startstop === 2) {
        document.getElementById("start").innerHTML = "START";
        startstop = 0;
        stop();
    }
}
/* Start */ function start() {
    x = setInterval(timer, 10);
}
/* Stop */ function stop() {
    clearInterval(x);
}
/* Contains and outputs returned value of function checkTime */ var milisec = 0;
var sec = 0; /* holds incrementing value */ 
var min = 0;
var hour = 0;
/* Output variables */ var miliSecOut = 0;
var secOut = 0;
var minOut = 0;
var hourOut = 0;
/* Timer */ function timer() {
    miliSecOut = checkTime(milisec);
    secOut = checkTime(sec);
    minOut = checkTime(min);
    hourOut = checkTime(hour);
    // Increments milisec
    milisec = ++milisec;
    // When milisec value gets to 100, it resets to 0 and the sec value increments by 1
    if (milisec === 100) {
        milisec = 0;
        sec = ++sec;
    }
    // When sec value gets to 60, it resets to 0 and the min value increments by 1
    if (sec == 60) {
        min = ++min;
        sec = 0;
    }
    // When min value gets to 60, it resets to 0 and the hour value increments by 1
    if (min == 60) {
        min = 0;
        hour = ++hour;
    }
    // Dom elements for stopwatch time values
    document.getElementById("milisec").innerHTML = miliSecOut;
    document.getElementById("sec").innerHTML = secOut;
    document.getElementById("min").innerHTML = minOut;
    document.getElementById("hour").innerHTML = hourOut;
}
/* Function adds 0 when value is <10 */ function checkTime(i) {
    if (i < 10) i = "0" + i;
    return i;
}
/*Reset*/ function reset() {
    // Resets variable values to 0
    milisec = 0;
    sec = 0;
    min = 0;
    hour = 0;
    // Changes html of elements to 00
    document.getElementById("milisec").innerHTML = "00";
    document.getElementById("sec").innerHTML = "00";
    document.getElementById("min").innerHTML = "00";
    document.getElementById("hour").innerHTML = "00";
}
// POMODORO
// https://dawidow.github.io/pomodoro-timer-js/
// DOM elements for pomodoro buttons
const timerPom = document.querySelector(".timer__time");
const startPom = document.querySelector(".timer__start");
const stopPom = document.querySelector(".timer__stop");
const resetPom = document.querySelector(".timer__reset");
const workPom = document.querySelector(".options__work");
const shortBreakBtn = document.querySelector(".options__shortbreak");
const longBreakBtn = document.querySelector(".options__longbreak");
stopPom.style.display = "none"; //hide stop button
workPom.style.backgroundColor = "rgb(221, 36, 117, 0.4)";
let seconds = 0, active = false, intervalID;
// Function to start timer
const startTimer = (mins)=>{
    clearInterval(intervalID);
    if (!active) {
        timerPom.textContent = "25:00";
        seconds = mins * 60 || 0;
    }
    active = true;
    if (active) intervalID = setInterval(time, 1000);
};
// Function for long break timer
const longBreakTimer = (mins)=>{
    resetTime();
    clearInterval(intervalID);
    if (!active) {
        timerPom.textContent = "10:00";
        seconds = mins * 60 || 0;
    }
    active = true;
    if (active) intervalID = setInterval(time, 1000);
};
// Function for short break timer
const shortBreakTimer = (mins)=>{
    resetTime();
    clearInterval(intervalID);
    if (!active) {
        timerPom.textContent = "5:00";
        seconds = mins * 60 || 0;
    }
    active = true;
    if (active) intervalID = setInterval(time, 1000);
};
// Function to reset timer
const resetTime = ()=>{
    clearInterval(intervalID);
    active = false;
    //lights up pomodoro button
    workPom.style.backgroundColor = 'rgb(221, 36, 117, 0.4)';
    shortBreakBtn.style.backgroundColor = 'rgb(33, 37, 83, 0.4)';
    longBreakBtn.style.backgroundColor = 'rgb(33, 37, 83, 0.4)';
};
// Function to stop timer
const stopTime = ()=>{
    clearInterval(intervalID);
};
// Function to keep track of time
const time = ()=>{
    seconds--; //decrements seconds by 1
    minutes = Math.floor(seconds / 60);
    sec = seconds % 60;
    if (sec < 10) sec = `0${sec}`;
    timerPom.textContent = `${minutes}:${sec}`; //displays time 
    //alarm sounds when timer reaches 0
    if (seconds === 0) {
        clearInterval(intervalID);
        playSound();
    }
};
// Function to play alarm sound
const playSound = ()=>{
    let mp3Source = '<source src="../audio/notification.mp3" type="audio/mpeg">';
    let oggSource = '<source src="../audio/notification.ogg" type="audio/ogg">';
    let embedSource = '<embed hidden="true" autostart="true" loop="false" src="../audio/notification.mp3">';
    document.querySelector(".sound").innerHTML = '<audio autoplay="autoplay">' + mp3Source + oggSource + embedSource + "</audio>";
};
// Triggers startTimer function when stop button is clicked
startPom.addEventListener("click", function() {
    startTimer(25);
    //toggle startstop buttons display
    stopPom.style.display = 'block'; //shows stop
    startPom.style.display = 'none'; //hides start
}, false);
// Triggers stopTime function when stop button is clicked
stopPom.addEventListener("click", function() {
    stopTime();
    //toggle startstop buttons display
    stopPom.style.display = 'none'; //hides stop
    startPom.style.display = 'block'; //shows start
}, false);
// Triggers resetTime function when stop button is clicked
resetPom.addEventListener("click", function() {
    resetTime();
    timerPom.textContent = "25:00";
    //toggle startstop buttons display
    stopPom.style.display = 'none'; //hides stop
    startPom.style.display = 'block'; //shows start
}, false);
// Triggers resetTime function when pomodoro button is clicked
workPom.addEventListener("click", function() {
    resetTime();
    //toggle startstop buttons display
    stopPom.style.display = 'none'; //hides stop
    startPom.style.display = 'block'; //shows start
}, false);
// Triggers startTimer function when pomodoro button is clicked
workPom.addEventListener("click", function() {
    startTimer(25);
    //toggle startstop buttons display
    stopPom.style.display = 'block'; //shows stop
    startPom.style.display = 'none'; //hides start
    //lights up pomodoro button
    workPom.style.backgroundColor = 'rgb(221, 36, 117, 0.4)';
    shortBreakBtn.style.backgroundColor = 'rgb(33, 37, 83, 0.4)';
    longBreakBtn.style.backgroundColor = 'rgb(33, 37, 83, 0.4)';
}, false);
// Triggers breakTimer function for long break when break button is clicked
longBreakBtn.addEventListener("click", function() {
    longBreakTimer(10); //sets timer for 10 min
    //toggle startstop buttons display
    stopPom.style.display = 'block'; //shows stop
    startPom.style.display = 'none'; //hides start
    //lights up long break button
    workPom.style.backgroundColor = 'rgb(33, 37, 83, 0.4)';
    shortBreakBtn.style.backgroundColor = 'rgb(33, 37, 83, 0.4)';
    longBreakBtn.style.backgroundColor = 'rgb(221, 36, 117, 0.4)';
}, false);
// Triggers breakTimer function for short break when break button is clicked
shortBreakBtn.addEventListener("click", function() {
    shortBreakTimer(5); //sets timer for 5 min
    //toggle startstop buttons display
    stopPom.style.display = 'block'; //shows stop
    startPom.style.display = 'none'; //hides start
    //lights up short break button
    workPom.style.backgroundColor = 'rgb(33, 37, 83, 0.4)';
    shortBreakBtn.style.backgroundColor = 'rgb(221, 36, 117, 0.4)';
    longBreakBtn.style.backgroundColor = 'rgb(33, 37, 83, 0.4)';
}, false);
//DICTIONARY
//definitions code referenced from https://www.codingnepalweb.com/build-dictionary-app-html-javascript/
//synonyms code referenced from
// HTML DOM elements
const wrapper = document.querySelector(".wrapper"), searchInput = wrapper.querySelector("input"), volume = wrapper.querySelector(".word i"), infoText = wrapper.querySelector(".info-text"), synonyms = wrapper.querySelector(".synonyms .syn-list"), removeIcon = wrapper.querySelector(".search .fa-xmark");
let audio;
// Check if word entered is valid
function data(result, word) {
    // Returns error message if invalid
    if (result.title) infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
    else {
        // If valid, finds elements of word in API
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0], phonetics = `${result[0].meanings[0].partOfSpeech}  /${result[0].phonetics[0].text}/`;
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phonetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".synonyms span").innerText = definitions.synonyms;
        audio = new Audio("https:" + result[0].phonetics[0].audio);
        if (definitions.synonyms[0] == undefined) synonyms.parentElement.style.display = "none";
        else {
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            for(let i = 0; i < 5; i++){
                let tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[i]},</span>`;
                tag = i == 4 ? tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[4]}</span>` : tag;
                synonyms.insertAdjacentHTML("beforeend", tag);
            }
        }
    }
}
// Search word in API
function search(word) {
    fetchApi(word);
    searchInput.value = word;
}
// Search loading/error
function fetchApi(word) {
    wrapper.classList.remove("active");
    infoText.style.color = "#9A9A9A";
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then((response)=>response.json()
    ).then((result)=>data(result, word)
    ).catch(()=>{
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
    });
}
// Search word when "Enter" key on keyboard is released
searchInput.addEventListener("keyup", (e)=>{
    let word = e.target.value.replace(/\s+/g, ' ');
    if (e.key == "Enter" && word) fetchApi(word);
});
// Play pronunciation audio
volume.addEventListener("click", ()=>{
    volume.style.color = "#4D59FB";
    audio.play();
    setTimeout(()=>{
        volume.style.color = "#999";
    }, 800);
});
// Remove cross icon when clicked
removeIcon.addEventListener("click", ()=>{
    searchInput.value = "";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.style.color = "#9A9A9A";
    infoText.innerHTML = "Type any existing word and press enter to get meaning, example, synonyms, etc.";
});
//MUSIC PLAYER
//referenced from https://www.geeksforgeeks.org/create-a-music-player-using-javascript/
// HTML DOM elements
const track_name = document.querySelector(".track-name");
const track_artist = document.querySelector(".track-artist");
let playpause_btn = document.querySelector('.box');
let next_btn = document.querySelector(".next");
let prev_btn = document.querySelector(".back");
let seek_slider = document.querySelector(".seek-slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let track_index = 0;
let isPlaying = false;
let updateTimer;
// Triggers play/pause button animation on click
// Referenced from https://codepen.io/samiullah1989/pen/zELqPd
playpause_btn.addEventListener('click', (e)=>{
    e.target.classList.toggle('pause');
});
// Create new audio element
let curr_track = document.createElement('audio');
// Define the tracks that have to be played
let track_list = [
    {
        name: "Night Owl",
        artist: "Broke For Free",
        path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
    },
    {
        name: "Enthusiast",
        artist: "Tours",
        path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
    },
    {
        name: "Shipping Lanes",
        artist: "Chad Crouch",
        path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3"
    }, 
];
// Load track
function loadTrack(track_index1) {
    clearInterval(updateTimer);
    resetValues();
    // Load a new track
    curr_track.src = track_list[track_index1].path;
    curr_track.load();
    // Update details of the track
    track_name.textContent = track_list[track_index1].name;
    track_artist.textContent = track_list[track_index1].artist;
    // Set an interval of 1000 milliseconds for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
    // Move to the next track if the current one finishes playing
    curr_track.addEventListener("ended", nextTrack);
}
// Reset Values
function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
// Switch between play and pause
function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}
// Play track
function playTrack() {
    curr_track.play();
    isPlaying = true;
// Replace icon with the pause icon
//   playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
// Pause track
function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
// Replace icon with the play icon
//   playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}
// Next track
function nextTrack() {
    if (track_index < track_list.length - 1) track_index += 1;
    else track_index = 0;
    loadTrack(track_index);
    playTrack();
}
// Previous track
function prevTrack() {
    if (track_index > 0) track_index -= 1;
    else track_index = track_list.length;
    loadTrack(track_index);
    playTrack();
}
// Time slider
function seekTo() {
    seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
// Updates time slider when music plays
function seekUpdate() {
    let seekPosition = 0;
    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;
        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
        // Adding a zero to the single digit time values
        if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;
        if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;
        if (currentMinutes < 10) currentMinutes = "0" + currentMinutes;
        if (durationMinutes < 10) durationMinutes = "0" + durationMinutes;
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
// Load the first track in the tracklist
loadTrack(track_index);

//# sourceMappingURL=index.f3bd186e.js.map
