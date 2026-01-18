// Script: deleteAdmins.js
// Usage: node scripts/deleteAdmins.js

require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const User = require('../src/models/User');

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const result = await User.deleteMany({ role: 'ADMIN' });
    console.log(`Deleted ${result.deletedCount || 0} admin user(s).`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error deleting admins:', err.message || err);
    process.exit(1);
  }
}

run();
