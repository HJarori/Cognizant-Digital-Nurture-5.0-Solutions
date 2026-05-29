/* =====================================
   1. JAVASCRIPT BASICS & SETUP
===================================== */

console.log("Welcome to the Community Portal");

window.onload = () => {

    alert("Page Loaded");

    loadEvents();

    loadSavedPreference();

    renderEvents();
};

/* =====================================
   BASICS & DATA TYPES
===================================== */

const portalName = "Community Portal";
const launchDate = "2026-06-01";
let availableSeats = 50;

console.log(
`${portalName} launches on ${launchDate}`
);


/* =====================================
   CLOSURE FOR REGISTRATION COUNT
===================================== */

function registrationTracker(){

    let totalRegistrations = 0;

    return function(){

        totalRegistrations++;

        console.log(
        `Total Registrations: ${totalRegistrations}`
        );

        return totalRegistrations;
    };
}

const trackRegistration =
registrationTracker();


/* =====================================
   CALLBACK FUNCTION
===================================== */

function searchEvents(callback){

    const result = callback(events);

    console.log(result);
}

searchEvents(function(data){

    return data.filter(
        event => event.category === "Music"
    );
});


/* =====================================
   OBJECT ENTRIES
===================================== */

Object.entries(events[0]).forEach(
([key,value]) => {

    console.log(key,value);

});


/* =====================================
   ARRAY METHODS
===================================== */

const musicEvents = events.filter(
event => event.category === "Music"
);

console.log(musicEvents);

const eventCards = events.map(
event => `Workshop on ${event.name}`
);

console.log(eventCards);


/* =====================================
   CONDITIONALS
===================================== */

function isValidEvent(event){

    const today = new Date();

    const eventDate =
    new Date(event.date);

    if(eventDate < today){

        return false;

    }else if(event.seats <= 0){

        return false;

    }

    return true;
}


/* =====================================
   UPDATED REGISTER FUNCTION
===================================== */

function registerUser(eventName){

    try{

        const event = events.find(
            e => e.name === eventName
        );

        if(!event){

            throw new Error(
            "Event not found"
            );

        }

        if(event.seats <= 0){

            throw new Error(
            "No seats available"
            );

        }

        event.seats--;

        trackRegistration();

        renderEvents();

    }catch(error){

        console.error(error.message);
    }
}


/* =====================================
   CANCEL REGISTRATION
===================================== */

function cancelRegistration(eventName){

    const event = events.find(
    e => e.name === eventName
    );

    if(event){

        event.seats++;

        renderEvents();
    }
}


/* =====================================
   DOM RENDERING
===================================== */

function renderEvents(){

    const container =
    document.querySelector("#events");

    container.innerHTML = "";

    events.forEach(event => {

        if(isValidEvent(event)){

            const card =
            document.createElement("div");

            card.className =
            "eventCard";

            card.innerHTML = `

            <h3>${event.name}</h3>

            <p>Date: ${event.date}</p>

            <p>Seats: ${event.seats}</p>

            <button onclick=
            "registerUser('${event.name}')">
            Register
            </button>

            <button onclick=
            "cancelRegistration('${event.name}')">
            Cancel
            </button>

            `;

            container.appendChild(card);
        }
    });
}


/* =====================================
   CATEGORY FILTER
===================================== */

document
.getElementById("eventType")
?.addEventListener("change",
function(){

    const category = this.value;

    const filtered =
    filterEventsByCategory(category);

    console.log(filtered);

});


/* =====================================
   QUICK SEARCH
===================================== */

document
.getElementById("searchBox")
?.addEventListener("keydown",
function(){

    const keyword =
    this.value.toLowerCase();

    const result =
    events.filter(event =>
    event.name.toLowerCase()
    .includes(keyword));

    console.log(result);
});


/* =====================================
   LOADING SPINNER
===================================== */

function showSpinner(){

    document.getElementById(
    "spinner"
    ).style.display="block";
}

function hideSpinner(){

    document.getElementById(
    "spinner"
    ).style.display="none";
}


/* =====================================
   ASYNC AWAIT + FETCH
===================================== */

async function loadEvents(){

    showSpinner();

    try{

        const response =
        await fetch(
        "https://jsonplaceholder.typicode.com/posts"
        );

        const data =
        await response.json();

        console.log(data);

    }catch(error){

        console.error(error);

    }finally{

        hideSpinner();
    }
}


/* =====================================
   DESTRUCTURING
===================================== */

const {

    name,
    date,
    seats

} = events[0];

console.log(
name,
date,
seats
);


/* =====================================
   SPREAD OPERATOR
===================================== */

const clonedEvents = [...events];

console.log(clonedEvents);


/* =====================================
   FORM HANDLING
===================================== */

document
.getElementById("regForm")
.addEventListener(
"submit",
function(event){

    event.preventDefault();

    const form =
    this.elements;

    const name =
    form["name"].value;

    const email =
    form["email"].value;

    const selectedEvent =
    form["eventType"].value;

    if(
        name === "" ||
        email === ""
    ){

        document
        .getElementById("msg")
        .textContent =
        "Please fill all fields";

        return;
    }

    document
    .getElementById("msg")
    .textContent =
    "Registration Successful";

    sendRegistration({
        name,
        email,
        selectedEvent
    });

});


/* =====================================
   AJAX POST REQUEST
===================================== */

function sendRegistration(user){

    console.log(
    "Submitting...",
    user
    );

    setTimeout(async()=>{

        try{

            const response =
            await fetch(
            "https://jsonplaceholder.typicode.com/posts",
            {
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:
                JSON.stringify(user)
            });

            const data =
            await response.json();

            console.log(
            "Success",
            data
            );

        }catch(error){

            console.log(
            "Failed",
            error
            );
        }

    },2000);
}


/* =====================================
   DEBUGGING LOGS
===================================== */

console.log(
"Form script loaded"
);

console.log(
"Events array",
events
);

renderEvents();

/* =====================================
   SAVE USER PREFERENCE
===================================== */

function savePreference(){

    const dropdown =
    document.getElementById("eventDropdown");

    localStorage.setItem(
        "preferredEvent",
        dropdown.value
    );

    alert("Preference Saved");
}


/* =====================================
   LOAD SAVED PREFERENCE
===================================== */

function loadSavedPreference(){

    const savedEvent =
    localStorage.getItem(
        "preferredEvent"
    );

    if(savedEvent){

        document.getElementById(
        "eventDropdown"
        ).value = savedEvent;
    }
}


/* =====================================
   CLEAR PREFERENCES
===================================== */

function clearPreference(){

    localStorage.clear();

    sessionStorage.clear();

    alert("Preferences Cleared");
}