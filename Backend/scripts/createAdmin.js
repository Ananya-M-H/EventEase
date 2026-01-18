// Script: createAdmin.js
// Usage: node scripts/createAdmin.js <email> <password>

require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');

async function run() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.error('Usage: node scripts/createAdmin.js <email> <password>');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await User.findOne({ email });
    if (user) {
      user.role = 'ADMIN';
      user.password = hashedPassword;
      await user.save();
      console.log(`Updated existing user to ADMIN: ${email}`);
    } else {
      user = new User({
        name: 'Admin',
        email,
        year: 'Others',
        password: hashedPassword,
        role: 'ADMIN'
      });
      await user.save();
      console.log(`Created new ADMIN user: ${email}`);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin user:', err.message || err);
    process.exit(1);
  }
}

run();
