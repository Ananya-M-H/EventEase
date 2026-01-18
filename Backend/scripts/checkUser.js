// Script: checkUser.js
// Usage: node scripts/checkUser.js <email>

require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const User = require('../src/models/User');

async function run() {
  const email = process.argv[2];
  if (!email) {
    console.error('Usage: node scripts/checkUser.js <email>');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    const user = await User.findOne({ email });
    if (user) {
      console.log('User found:');
      console.log(`  ID: ${user._id}`);
      console.log(`  Name: ${user.name}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Year: ${user.year}`);
      console.log(`  Role: ${user.role}`);
    } else {
      console.log(`No user found with email: ${email}`);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
}

run();
