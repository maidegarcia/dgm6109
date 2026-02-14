"use strict"

let trackingData = [{
    date: "Monday 26 Jan 2026",
    sessions: {
        study: [{ time: "3pm", duration: 30 }, { time: "4pm", duration: 180 }], //list of study sessions
        music: [{ time: "3:40pm", duration: 20 }], //list of music practice sessions
        french: [{ time: "11am", duration: 30 }, { time: "7pm", duration: 40 }],//list of french study sessions
        read: [{ time: "9pm", duration: 30 }],//list of reading sessions
        sleep: [{ time: "11pm", duration: 455 }],//list of sleeping sessions
    },
    energy: [{ time: "7am", level: 4 }, { time: "7pm", level: 4 }]//list of energy levels during the day

}, {
    date: "Tuesday 27 Jan 2026",
    sessions: {
        study: [{ time: "6:30am", duration: 120 }, { time: "2pm", duration: 30 }],//list of study sessions
        music: [],//list of music practice sessions
        french: [{ time: "12pm", duration: 70 }],//list of french study sessions
        read: [{ time: "9:25am", duration: 60 }],//list of reading sessions
        sleep: [{ time: "9:35pm", duration: 365 }],//list of sleeping sessions
    },
    energy: [{ time: "7am", level: 4 }, { time: "7pm", level: 3 }]//list of energy levels during the day
}, {
    date: "Wednesday 28 Jan 2026",
    sessions:{
    study: [{ time: "8am", duration: 300 }, { time: "3pm", duration: 90 }, { time: "10pm", duration: 120 }],//list of study sessions
    music: [{ time: "4:30pm", duration: 30 }],//list of music practice sessions
    french: [],//list of french study sessions
    read: [],//list of reading sessions
    sleep: [{ time: "10:52pm", duration: 405 }],//list of sleeping sessions
    },
    energy: [{ time: "7am", level: 3 }, { time: "7pm", level: 4 }]//list of energy levels during the day
}, {
    date: "Thursday 29 Jan 2026",
    sessions: {
        study: [{ time: "10am", duration: 75 }, { time: "8pm", duration: 120 }],//list of study sessions
        music: [],//list of music practice sessions
        french: [{ time: "9:08am", duration: 31 }],//list of french study sessions
        read: [],//list of reading sessions
        sleep: [{ time: "12:10am", duration: 310 }]//list of sleeping sessions
    },
    energy: [{ time: "7am", level: 2 }, { time: "7pm", level: 3 }]//list of energy levels during the day
}, {
    date: "Friday 30 Jan 2026",
    sessions: {
        study: [{time:"8:30am", duration: 60}, { time: "11:30am", duration: 137 }, { time: "4pm", duration: 120 }, { time: "7pm", duration: 60 }],//list of study sessions
        music: [{ time: "3:30pm", duration: 30 }],//list of music practice sessions
        french: [],//list of french study sessions
        read: [],//list of reading sessions
        sleep: [{ time: "12:00am", duration: 325 }]//list of sleeping sessions
    },
    energy: [{ time: "7am", level: 5 }, { time: "7pm", level: 2 }]//list of energy levels during the day
}, {
    date: "Saturday 31 Jan 2026",
    sessions: {
        study: [],//list of study sessions
        music: [{ time: "10:20am", duration: 83 }],//list of music practice sessions
        french: [{ time: "2:10pm", duration: 25 }],//list of french study sessions
        read: [{ time: "8pm", duration: 30 }],//list of reading sessions
        sleep: [{ time: "12:26pm", duration: 290 }]//list of sleeping sessions
    },
    energy: [{ time: "7am", level: 2 }, { time: "7pm", level: 4 }]//list of energy levels during the day
}, {
    date: "Sunday 1 Feb 2026",
    sessions: {
        study: [{ time: "3pm", duration: 210 }],//list of study sessions
        music: [{ time: "2:30pm", duration: 30 }],//list of music practice sessions
        french: [{ time: "11am", duration: 32 }, { time: "12:30pm", duration: 35 }],//list of french study sessions
        read: [],//list of reading sessions
        sleep: [{ time: "11pm", duration: 450 }]//list of sleeping sessions
    },
    energy: [{ time: "7am", level: 4 }, { time: "7pm", level: 5 }]//list of energy levels during the day
}, {
    date: "Monday 2 Feb 2026",
    sessions: {
        study: [{ time: "7:10pm", duration: 103 }],//list of study sessions
        music: [],//list of music practice sessions
        french: [],//list of french study sessions
        read: [],//list of reading sessions
        sleep: [{ time: "11:21pm", duration: 305 }]//list of sleeping sessions
    },
    energy: [{ time: "7am", level: 5 }, { time: "7pm", level: 2 }]//list of energy levels during the day
}, {
    date: "Tuesday 3 Feb 2026",
    sessions: {
        study: [{ time: "5:17pm", duration: 183 }],//list of study sessions
        music: [{ time: "9:40am", duration: 37 }],//list of music practice sessions
        french: [],//list of french study sessions
        read: [],//list of reading sessions
        sleep: [{ time: "10:52pm", duration: 488 }]//list of sleeping sessions
    },
    energy: [{ time: "7am", level: 4 }, { time: "7pm", level: 4 }]//list of energy levels during the day
}, {
    date: "Wednesday 4 Feb 2026",
    sessions: {
        study: [{ time: "3:30pm", duration: 270 }, { time: "8:47pm", duration: 283 }],//list of study sessions
        music: [],//list of music practice sessions
        french: [{ time: "12:18pm", duration: 22 }],//list of french study sessions
        read: [{ time: "2:00pm", duration: 35 }],//list of reading sessions
        sleep: [{ time: "11:43pm", duration: 345 }]//list of sleeping sessions
    },
    energy: [{ time: "7am", level: 5 }, { time: "7pm", level: 3 }]//list of energy levels during the day
}, {
    date: "Thursday 5 Feb 2026",
    sessions: {
        study: [{ time: "6:10pm", duration: 165 }],//list of study sessions
        music: [],//list of music practice sessions
        french: [{ time: "9:23pm", duration: 27 }],//list of french study sessions
        read: [],//list of reading sessions
        sleep: [{ time: "12:48am", duration: 225 }]//list of sleeping sessions
    },
    energy: [{ time: "7am", level: 2 }, { time: "7pm", level: 4 }]//list of energy levels during the day
}, {
    date: "Friday 6 Feb 2026",
    sessions: {
        study: [{ time: "9am", duration: 120 }, { time: "2pm", duration: 103 }],//list of study sessions
        music: [{ time: "6:08pm", duration: 30 }],//list of music practice sessions
        french: [{ time: "4:06pm", duration: 21 }, { time: "7pm", duration: 38 }],//list of french study sessions
        read: [{ time: "5pm", duration: 25 }],//list of reading sessions
        sleep: [{ time: "11pm", duration: 290 }]//list of sleeping sessions
    },
    energy: [{ time: "7am", level: 3 }, { time: "7pm", level: 4 }]//list of energy levels during the day
}, {
    date: "Saturday 7 Feb 2026",
    sessions: {
        study: [{ time: "1:50pm", duration: 180 }],//list of study sessions
        music: [{ time: "5pm", duration: 32 }],//list of music practice sessions
        french: [{ time: "10:45am", duration: 20 }],//list of french study sessions
        read: [{ time: "9:50pm", duration: 26 }],//list of reading sessions
        sleep: [{ time: "10:32pm", duration: 395 }]//list of sleeping sessions
    },
    energy: [{ time: "7am", level: 5 }, { time: "7pm", level: 4 }]//list of energy levels during the day
}, {
    date: "Sunday 8 Feb 2026",
    sessions: {
        study: [{ time: "6:20pm", duration: 50 }],//list of study sessions
        music: [{ time: "5:47pm", duration: 26 }],//list of music practice sessions
        french: [{ time: "9:03am", duration: 73 }],//list of french study sessions
        read: [{ time: "9:50pm", duration: 22 }],//list of reading sessions
        sleep: [{ time: "10:20pm", duration: 430 }]//list of sleeping sessions
    },
    energy: [{ time: "7am", level: 3 }, { time: "7pm", level: 5 }]//list of energy levels during the day
}, {
    date: "Monday 9 Feb 2026",
    sessions: {
        study: [{ time: "5pm", duration: 220 }],//list of study sessions
        music: [{ time: "3:36pm", duration: 15 }],//list of music practice sessions
        french: [{ time: "9pm", duration: 22 }],//list of french study sessions
        read: [{ time: "9:57pm", duration: 12 }],//list of reading sessions
        sleep: [{ time: "10:14pm", duration: 440 }]//list of sleeping sessions
    },
    energy: [{ time: "7am", level: 4 }, { time: "7pm", level: 5 }]//list of energy levels during the day
}, {
    date: "Tuesday 10 Feb 2026",
    sessions: {
        study: [{ time: "11:25am", duration: 35 }],//list of study sessions
        music: [],//list of music practice sessions
        french: [{ time: "10:39am", duration: 37 }],//list of french study sessions
        read: [],//list of reading sessions
        sleep: [{ time: "10:10pm", duration: 445 }]//list of sleeping sessions
    },
    energy: [{ time: "7am", level: 5 }, { time: "7pm", level: 3 } ]//list of energy levels during the day
}, {
    date: "Wednesday 11 Feb 2026",
    sessions: {
        study: [{ time: "9am", duration: 165 }, { time: "1pm", duration: 120 }],//list of study sessions
        music: [{ time: "5pm", duration: 49 }],//list of music practice sessions
        french: [],//list of french study sessions
        read: [],//list of reading sessions
        sleep: [{ time: "10:27pm", duration: 270 }]//list of sleeping sessions
    },
    energy: [{ time: "7am", level: 2 }, { time: "7pm", level: 4 }]//list of energy levels during the day
}, {
    date: "Thursday 12 Feb 2026",
    sessions: {
        study: [{ time: "10am", duration: 30 }],//list of study sessions
        music: [],//list of music practice sessions
        french: [],//list of french study sessions
        read: [],//list of reading sessions
        sleep: [{ time: "10:36pm", duration: 345 }]//list of sleeping sessions
    },
    energy: [{ time: "7am", level: 2 }, { time: "7pm", level: 2 }]//list of energy levels during the day
}];//list of the days of data collection

// console.log(JSON.stringify(trackingData));
showData(trackingData);
