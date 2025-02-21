const mongoose = require('mongoose');
const Entry = require('./models/entry');  // Import Entry model
const User = require('./models/user'); // Import User model

mongoose.connect('mongodb://localhost:27017/journalApp')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB Connection Error:", err));

const addAuthorToEntries = async () => {
    try {
        const author = await User.findOne({ username: "shadow" }); // Modify username as needed
        if (!author) {
            console.log("Author not found!");
            return;
        }

        const entries = await Entry.find();
        if (entries.length === 0) {
            console.log("No entries found!");
            return;
        }

        for (let entry of entries) {
            entry.author = author._id; 
            await entry.save(); 
        }

        console.log(`✅ Successfully added ${author.username} as the author to all entries!`);
        
    } catch (err) {
        console.error("Error updating entries:", err);
    } finally {
        mongoose.connection.close();
    }
};


addAuthorToEntries();






// const mongoose = require('mongoose')
// const Entry = require('./models/entry')
// const NewUser = require('./models/newUser')

// mongoose.connect('mongodb://localhost:27017/journalApp')
// .then(()=>{
//     console.log("CONNECTED TO MONGO")
// }).catch(err=>[
//     console.log(err)
// ])

// // const seedEntries = [
// //     {
// //         title: "Morning Reflections",
// //         content: "Had a peaceful morning walk today. The fresh air felt refreshing.",
// //         date: new Date("2024-01-01T08:00:00Z")
// //     },
// //     {
// //         title: "Work Challenges",
// //         content: "Faced some difficulties at work, but I managed to solve them.",
// //         date: new Date("2024-01-02T18:30:00Z")
// //     },
// //     {
// //         title: "New Book Started",
// //         content: "Started reading 'Atomic Habits' today. Seems promising so far!",
// //         date: new Date("2024-01-03T21:00:00Z")
// //     },
// //     {
// //         title: "Gym Progress",
// //         content: "Hit a new personal best in deadlifts today. Feeling strong!",
// //         date: new Date("2024-01-04T17:15:00Z")
// //     },
// //     {
// //         title: "Weekend Plans",
// //         content: "Planning a road trip this weekend with friends. Excited!",
// //         date: new Date("2024-01-05T11:45:00Z")
// //     },
// //     {
// //         title: "Late Night Thoughts",
// //         content: "Couldn't sleep, so I spent some time journaling my thoughts.",
// //         date: new Date("2024-01-06T02:00:00Z")
// //     },
// //     {
// //         title: "Meditation Benefits",
// //         content: "Tried a 10-minute meditation today. Felt more focused afterward.",
// //         date: new Date("2024-01-07T07:30:00Z")
// //     },
// //     {
// //         title: "Cooking Experiment",
// //         content: "Tried making homemade pasta. It turned out pretty good!",
// //         date: new Date("2024-01-08T19:20:00Z")
// //     },
// //     {
// //         title: "Coding Breakthrough",
// //         content: "Finally solved a complex bug in my project. Big relief!",
// //         date: new Date("2024-01-09T14:00:00Z")
// //     },
// //     {
// //         title: "Music Discovery",
// //         content: "Discovered a new band today, and their songs are amazing!",
// //         date: new Date("2024-01-10T22:15:00Z")
// //     },
// //     {
// //         title: "Family Time",
// //         content: "Spent quality time with family today. Much needed.",
// //         date: new Date("2024-01-11T16:45:00Z")
// //     },
// //     {
// //         title: "Rainy Day Mood",
// //         content: "Loved watching the rain today while sipping some hot tea.",
// //         date: new Date("2024-01-12T10:00:00Z")
// //     },
// //     {
// //         title: "Nature Hike",
// //         content: "Went hiking in the hills, the view was breathtaking!",
// //         date: new Date("2024-01-13T09:30:00Z")
// //     },
// //     {
// //         title: "Deep Work Session",
// //         content: "Had a super productive deep work session today. No distractions!",
// //         date: new Date("2024-01-14T12:00:00Z")
// //     },
// //     {
// //         title: "Movie Night",
// //         content: "Watched an old classic movie. Nostalgic and relaxing.",
// //         date: new Date("2024-01-15T20:00:00Z")
// //     },
// //     {
// //         title: "Creative Writing",
// //         content: "Wrote a short story today. Might turn it into something bigger!",
// //         date: new Date("2024-01-16T15:00:00Z")
// //     },
// //     {
// //         title: "Minimalism Thoughts",
// //         content: "Thinking of decluttering my space and embracing minimalism.",
// //         date: new Date("2024-01-17T08:00:00Z")
// //     },
// //     {
// //         title: "New Tech Trends",
// //         content: "Read about upcoming AI advancements. The future is exciting!",
// //         date: new Date("2024-01-18T18:45:00Z")
// //     },
// //     {
// //         title: "Workout Routine",
// //         content: "Switched up my workout routine. Feeling sore but good!",
// //         date: new Date("2024-01-19T07:00:00Z")
// //     },
// //     {
// //         title: "Reflections on Growth",
// //         content: "Looking back at my progress over the past year. Proud of how far I’ve come.",
// //         date: new Date("2024-01-20T22:30:00Z")
// //     }
// // ];


// const seedUsers = [
//     { username: "john_doe", password: "pass123", age: "25", profession: "Student" },
//     { username: "jane_smith", password: "helloWorld", age: "30", profession: "Entreprenuer" },
//     { username: "mike_rogers", password: "securePass", age: "28", profession: "Employee" },
//     { username: "lisa_jones", password: "passMeIn", age: "32", profession: "Medical" },
//     { username: "ryan_harris", password: "alphaBeta", age: "22", profession: "Athlete" },
//     { username: "emma_watson", password: "hermioneGranger", age: "27", profession: "Entreprenuer" },
//     { username: "david_clark", password: "strongPass", age: "35", profession: "Medical" },
//     { username: "olivia_martin", password: "sunnyDay", age: "24", profession: "Student" },
//     { username: "chris_evans", password: "captainAmerica", age: "29", profession: "Employee" },
//     { username: "sophia_adams", password: "helloMongoose", age: "26", profession: "Athlete" }
// ];



// NewUser.insertMany(seedUsers)
// .then(res=>{
//     console.log(res)
//   })
//   .catch(err=>{
//     console.error(err)
//   })
  