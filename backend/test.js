const mongoose = require('mongoose');

const Entry = require('./models/entry');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/journalApp')
    .then(() => console.log("CONNECTED TO MONGO"))
    .catch(err => console.log('ERROR:', err));

const addAuthor = async () => {
    try {
        const entryId = '67b8122e2f2e30bcda61bdc7';
        const userId = '67a305abe63165320f7e0d34';


        const foundEntry = await Entry.findById(entryId);
        const foundUser = await User.findById(userId);

        if (!foundEntry) {
            console.log(`Entry with ID ${entryId} not found`);
            return;
        }
        if (!foundUser) {
            console.log(`User with ID ${userId} not found`);
            return;
        }

        // Push only the User ID, not the whole user object
        foundEntry.author.push(foundUser._id);
        await foundEntry.save(); // Save the updated Entry

        console.log("Author added successfully!", foundUser);
    } catch (err) {
        console.error("Error adding author:", err);
    } finally {
        mongoose.connection.close(); // Close connection after execution
    }
};

// Call the function
addAuthor();
