"use strict"

// let yourVariableHere = [{
//     studentName: "Susie",
//     numberOfFriends: 3,
//     namesOfEnemies: ["Terry", "Allison"]
// }, {
//     studentName: "Terry",
//     numberOfFriends: 4,
//     namesOfEnemies: ["Susie", "Jamie", "Horace"]
// }, {
//     studentName: "Horace",
//     numberOfFriends: 2,
//     namesOfEnemies: ["Susie"]
// }];


let days = [{
    date: "Monday 26 Jan 2026",
    sessions: {
        study: [{ time: "3pm", duration: 30 }, { time: "4pm", duration: 180 }],
        music: [{ time: "3:40pm", duration: 20 }],
        french: [{ time: "11am", duration: 30 }, { time: "7pm", duration: 40 }],
        read: [{ time: "9pm", duration: 30 }],
        sleep: [{ time: "11pm", duration: 455 }],
    },
    energy: [{ time: "7am", level: 4 }, { time: "7pm", level: 4 }]

}, {
    date: "Tuesday 27 Jan 2026",
    sessions: {
        study: [{ time: "6:30am", duration: 120 }, { time: "2pm", duration: 30 }],
        music: [],
        french: [{ time: "12pm", duration: 70 }],
        read: [{ time: "9:25am", duration: 60 }],
        sleep: [{ time: "9:35pm", duration: 365 }],
    },
    energy: [{ time: "7am", level: 4 }, { time: "7pm", level: 3 }]
}, {
    date: "Wednesday 28 Jan 2026",
    sessions:{
    study: [{ time: "8am", duration: 300 }, { time: "3pm", duration: 90 }, { time: "10pm", duration: 120 }],
    music: [{ time: "4:30pm", duration: 30 }],
    french: [],
    read: [],
    sleep: [{ time: "10:52pm", duration: 405 }],
    },
    energy: [{ time: "7am", level: 3 }, { time: "7pm", level: 4 }]
}, {
    date: "Thursday 29 Jan 2026",
    sessions: {
        study: [{ time: "10am", duration: 75 }, { time: "8pm", duration: 120 }],
        music: [],
        french: [{ time: "9:08am", duration: 31 }],
        read: [],
        sleep: [{ time: "12:10am", duration: 310 }]
    },
    energy: [{ time: "7am", level: 2 }, { time: "7pm", level: 3 }]
}, {
    date: "Friday 30 Jan 2026",
    sessions: {
        study: [{ time: "11:30am", duration: 137 }, { time: "4pm", duration: 120 }, { time: "7pm", duration: 60 }],
        music: [{ time: "3:30pm", duration: 30 }],
        french: [],
        read: [],
        sleep: [{ time: "12:00am", duration: 325 }]
    },
    energy: [{ time: "7am", level: 5 }, { time: "7pm", level: 2 }]
}, {
    date: "Saturday 31 Jan 2026",
    sessions: {
        study: [{ time: "10:20am", duration: 83 }, { time: "2:10pm", duration: 25 }],
        music: [],
        french: [{ time: "8pm", duration: 30 }],
        read: [],
        sleep: [{ time: "12:26pm", duration: 290 }]
    },
    energy: [{ time: "7am", level: 2 }, { time: "7pm", level: 4 }]
}, {
    date: "Sunday 1 Feb 2026",
    sessions: {
        study: [{ time: "3pm", duration: 210 }],
        music: [{ time: "2:30pm", duration: 30 }],
        french: [{ time: "11am", duration: 32 }],
        read: [{ time: "12:30pm", duration: 35 }],
        sleep: [{ time: "11pm", duration: 450 }]
    },
    energy: [{ time: "7am", level: 4 }, { time: "7pm", level: 5 }]
}, {
    date: "Monday 2 Feb 2026",
    sessions: {
        study: [{ time: "7:10pm", duration: 103 }],
        music: [],
        french: [],
        read: [],
        sleep: [{ time: "11:21pm", duration: 305 }]
    },
    energy: [{ time: "7am", level: 5 }, { time: "7pm", level: 2 }]
}, {
    date: "Tuesday 3 Feb 2026",
    sessions: {
        study: [{ time: "5:17pm", duration: 183 }],
        music: [{ time: "9:40am", duration: 37 }],
        french: [],
        read: [],
        sleep: [{ time: "10:52pm", duration: 488 }]
    },
    energy: [{ time: "7am", level: 4 }, { time: "7pm", level: 4 }]
}, {
    date: "Wednesday 4 Feb 2026",
    sessions: {
        study: [{ time: "3:30pm", duration: 270 }, { time: "8:47pm", duration: 283 }],
        music: [{ time: "12:18pm", duration: 22 }],
        french: [{ time: "2:00pm", duration: 35 }],
        read: [],
        sleep: [{ time: "11:43pm", duration: 345 }]
    },
    energy: [{ time: "7am", level: 5 }, { time: "7pm", level: 3 }]
}, {
    date: "Thursday 5 Feb 2026",
    sessions: {
        study: [{ time: "6:10pm", duration: 165 }],
        music: [{ time: "9:23pm", duration: 27 }],
        french: [],
        read: [],
        sleep: [{ time: "12:48am", duration: 225 }]
    },
    energy: [{ time: "7am", level: 2 }, { time: "7pm", level: 4 }]
}, {
    date: "Friday 6 Feb 2026",
    sessions: {
        study: [{ time: "9am", duration: 120 }, { time: "2pm", duration: 103 }],
        music: [{ time: "6:08pm", duration: 30 }],
        french: [{ time: "4:06pm", duration: 21 }, { time: "7pm", duration: 38 }],
        read: [{ time: "5pm", duration: 25 }],
        sleep: [{ time: "11pm", duration: 290 }]
    },
    energy: [{ time: "7am", level: 3 }, { time: "7pm", level: 4 }]
}, {
    date: "Saturday 7 Feb 2026",
    sessions: {
        study: [{ time: "1:50pm", duration: 180 }],
        music: [{ time: "5pm", duration: 32 }],
        french: [{ time: "10:45am", duration: 20 }],
        read: [{ time: "9:50pm", duration: 26 }],
        sleep: [{ time: "10:32pm", duration: 395 }]
    },
    energy: [{ time: "7am", level: 5 }, { time: "7pm", level: 4 }]
}, {
    date: "Sunday 8 Feb 2026",
    sessions: {
        study: [{ time: "6:20pm", duration: 50 }],
        music: [{ time: "5:47pm", duration: 26 }],
        french: [{ time: "9:03am", duration: 73 }],
        read: [{ time: "9:50pm", duration: 22 }],
        sleep: [{ time: "10:20pm", duration: 430 }]
    },
    energy: [{ time: "7am", level: 3 }, { time: "7pm", level: 5 }]
}, {
    date: "Monday 9 Feb 2026",
    sessions: {
        study: [{ time: "5pm", duration: 220 }],
        music: [{ time: "3:36pm", duration: 15 }],
        french: [{ time: "9pm", duration: 22 }],
        read: [{ time: "9:57pm", duration: 12 }],
        sleep: [{ time: "10:14pm", duration: 440 }]
    },
    energy: [{ time: "7am", level: 4 }, { time: "7pm", level: 5 }]
}, {
    date: "Tuesday 10 Feb 2026",
    sessions: {
        study: [{ time: "11:25am", duration: 35 }],
        music: [{ time: "10:30am", duration: 37 }],
        french: [],
        read: [],
        sleep: [{ time: "10:10pm", duration: 445 }]
    },
    energy: [{ time: "7am", level: 5 }, { time: "7pm", level: 3 } ]
}, {
    date: "Wednesday 11 Feb 2026",
    sessions: {
        study: [{ time: "9am", duration: 165 }, { time: "1pm", duration: 120 }],
        music: [{ time: "5pm", duration: 49 }],
        french: [],
        read: [],
        sleep: [{ time: "10:27pm", duration: 270 }]
    },
    energy: [{ time: "7am", level: 2 }, { time: "7pm", level: 4 }]
}, {
    date: "Thursday 12 Feb 2026",
    sessions: {
        study: [{ time: "10am", duration: 30 }],
        music: [],
        french: [],
        read: [],
        sleep: [{ time: "10:36pm", duration: 345 }]
    },
    energy: [{ time: "7am", level: 2 }, { time: "7pm", level: 2 }]
}];

console.log(JSON.stringify(days));
// showData(yourVariableHere);
