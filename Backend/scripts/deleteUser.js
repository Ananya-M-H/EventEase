// Script: deleteUser.js
// Usage: node scripts/deleteUser.js user@example.com

require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const User = require('../src/models/User');

async function run() {
  const email = process.argv[2];
  if (!email) {
    console.error('Usage: node scripts/deleteUser.js <email>');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    const user = await User.findOneAndDelete({ email });
    if (user) {
      console.log(`Deleted user with email: ${email}`);
    } else {
      console.log(`No user found with email: ${email}`);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error deleting user:', err.message || err);
    process.exit(1);
  }
}

run();
