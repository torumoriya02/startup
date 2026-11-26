const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const username = encodeURIComponent(config.userName);
const password = encodeURIComponent(config.password);

const url = `mongodb+srv://${username}:${password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('startup');

// MongoDB collections
const users = db.collection('users');
const sitters = db.collection('sitters');
const messages = db.collection('messages');
const bookings = db.collection('bookings');

// Connect to MongoDB
async function connectDatabase(initialSitters) {
  await client.connect();
  await db.command({ ping: 1 });

  // Prevent duplicate users and babysitters
  await users.createIndex({ email: 1 }, { unique: true });
  await users.createIndex({ id: 1 }, { unique: true });
  await sitters.createIndex({ id: 1 }, { unique: true });

  // Seed initial babysitter profiles
  for (const sitter of initialSitters) {
    await sitters.updateOne(
      { id: sitter.id },
      { $setOnInsert: sitter },
      { upsert: true }
    );
  }

  console.log('Successfully connected to MongoDB');
}

// User functions
function getUser(email) {
  return users.findOne({ email });
}

function getUserByToken(token) {
  if (!token || typeof token !== 'string') {
    return null;
  }

  return users.findOne({ token });
}

async function addUser(user) {
  await users.insertOne({ ...user });
}

async function updateUser(id, updates) {
  await users.updateOne(
    { id },
    { $set: updates }
  );
}

async function removeUserToken(token) {
  if (token && typeof token === 'string') {
    await users.updateOne(
      { token },
      { $unset: { token: '' } }
    );
  }
}

// Babysitter functions
function getSitters() {
  return sitters.find(
    {},
    { projection: { _id: 0 } }
  ).toArray();
}

function getSitter(id) {
  return sitters.findOne(
    { id: Number(id) },
    { projection: { _id: 0 } }
  );
}

// Message functions
function getMessages(userId) {
  return messages.find(
    { userId },
    { projection: { _id: 0 } }
  ).sort({ time: 1 }).toArray();
}

async function addMessage(message) {
  await messages.insertOne({ ...message });
}

// Booking functions
function getBookings(userId) {
  return bookings.find(
    { userId },
    { projection: { _id: 0 } }
  ).toArray();
}

async function addBooking(booking) {
  await bookings.insertOne({ ...booking });
}

module.exports = {
  connectDatabase,
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  removeUserToken,
  getSitters,
  getSitter,
  getMessages,
  addMessage,
  getBookings,
  addBooking,
};