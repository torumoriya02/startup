const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { randomUUID } = require('node:crypto');
const path = require('node:path');

const app = express();

const port = process.argv.length > 2
  ? Number(process.argv[2])
  : 4000;

const authCookieName = 'token';

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data
let users = [];
let messages = [];
let bookings = [];

const sitters = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    location: 'Chicago, IL',
    rating: 4.9,
    reviews: 24,
    price: 22,
    distance: '0.8 miles away',
    experience: 6,
    tags: ['CPR Certified', 'First Aid', 'Non-smoker'],
    bio: 'Experienced preschool teacher looking for weekend sitting.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'Chicago, IL',
    rating: 4.8,
    reviews: 15,
    price: 18,
    distance: '1.2 miles away',
    experience: 4,
    tags: ['Has Car', 'Homework Help', 'Toddlers'],
    bio: 'College student with 4 years of experience with all ages.',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    location: 'Provo, UT',
    rating: 5.0,
    reviews: 42,
    price: 25,
    distance: '2.5 miles away',
    experience: 10,
    tags: ['Bilingual', 'Infant Care', 'Cooks'],
    bio: 'Professional nanny with 10+ years experience.',
  },
  {
    id: 4,
    name: 'Jessica Taylor',
    location: 'Provo, UT',
    rating: 4.7,
    reviews: 8,
    price: 20,
    distance: '3.1 miles away',
    experience: 3,
    tags: ['Pet Friendly', 'Arts & Crafts'],
    bio: 'Energetic caregiver who loves outdoor activities.',
  },
];

// API router
const apiRouter = express.Router();

app.use('/api', apiRouter);

// Authentication helper
function findUser(field, value) {
  if (!value) return null;

  return users.find((user) => user[field] === value);
}

// Authentication cookie
function setAuthCookie(res, token) {
  res.cookie(authCookieName, token, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Verify authentication
function verifyAuth(req, res, next) {
  const user = findUser(
    'token',
    req.cookies[authCookieName]
  );

  if (!user) {
    return res.status(401).send({
      msg: 'Unauthorized',
    });
  }

  req.user = user;
  next();
}

// Create account
apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body;

  if (
    typeof email !== 'string' ||
    !email.trim() ||
    typeof password !== 'string' ||
    !password ||
    Buffer.byteLength(password, 'utf8') > 72
  ) {
    return res.status(400).send({
      msg: 'A valid email and password are required',
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (findUser('email', normalizedEmail)) {
    return res.status(409).send({
      msg: 'User already exists',
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  if (findUser('email', normalizedEmail)) {
    return res.status(409).send({
      msg: 'User already exists',
    });
  }

  const user = {
    id: randomUUID(),
    email: normalizedEmail,
    password: passwordHash,
    token: randomUUID(),
    name: normalizedEmail.split('@')[0],
    location: '',
    bio: '',
  };

  users.push(user);

  setAuthCookie(res, user.token);

  res.send({
    email: user.email,
  });
});

// Login
apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    Buffer.byteLength(password, 'utf8') > 72
  ) {
    return res.status(400).send({
      msg: 'Invalid credentials',
    });
  }

  const user = findUser(
    'email',
    email.trim().toLowerCase()
  );

  if (
    !user ||
    !(await bcrypt.compare(password, user.password))
  ) {
    return res.status(401).send({
      msg: 'Invalid email or password',
    });
  }

  user.token = randomUUID();

  setAuthCookie(res, user.token);

  res.send({
    email: user.email,
  });
});

// Logout
apiRouter.delete('/auth/logout', (req, res) => {
  const user = findUser(
    'token',
    req.cookies[authCookieName]
  );

  if (user) {
    delete user.token;
  }

  res.clearCookie(authCookieName, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });

  res.status(204).end();
});

// Get current authenticated user
apiRouter.get('/auth/me', verifyAuth, (req, res) => {
  res.send({
    email: req.user.email,
    name: req.user.name,
  });
});

// Get all babysitters
apiRouter.get('/sitters', (req, res) => {
  res.send(sitters);
});

// Get messages for the current user
apiRouter.get('/messages', verifyAuth, (req, res) => {
  const userMessages = messages.filter(
    (message) => message.userId === req.user.id
  );

  res.send(userMessages);
});

// Send a message
apiRouter.post('/messages', verifyAuth, (req, res) => {
  const { sitterId, text } = req.body;

  const sitter = sitters.find(
    (sitter) => sitter.id === Number(sitterId)
  );

  if (!sitter || typeof text !== 'string' || !text.trim()) {
    return res.status(400).send({
      msg: 'Valid babysitter and message are required',
    });
  }

  const message = {
    id: randomUUID(),
    userId: req.user.id,
    sitterId: sitter.id,
    sitterName: sitter.name,
    sender: 'You',
    text: text.trim(),
    time: new Date().toISOString(),
  };

  messages.push(message);

  // Simulate a babysitter reply
  setTimeout(() => {
    messages.push({
      id: randomUUID(),
      userId: message.userId,
      sitterId: sitter.id,
      sitterName: sitter.name,
      sender: sitter.name,
      text: 'Thanks for your message! I will get back to you soon.',
      time: new Date().toISOString(),
    });
  }, 5000);

  res.status(201).send(message);
});

// Get booking requests
apiRouter.get('/bookings', verifyAuth, (req, res) => {
  const userBookings = bookings.filter(
    (booking) => booking.userId === req.user.id
  );

  res.send(userBookings);
});

// Create a booking request
apiRouter.post('/bookings', verifyAuth, (req, res) => {
  const { sitterId, date, message } = req.body;

  const sitter = sitters.find(
    (sitter) => sitter.id === Number(sitterId)
  );

  if (
    !sitter ||
    typeof date !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date)
  ) {
    return res.status(400).send({
      msg: 'Valid babysitter and date are required',
    });
  }

  const booking = {
    id: randomUUID(),
    userId: req.user.id,
    sitterId: sitter.id,
    sitterName: sitter.name,
    date,
    message: typeof message === 'string' ? message : '',
    status: 'Pending',
  };

  bookings.push(booking);

  res.status(201).send(booking);
});

// Get user profile
apiRouter.get('/profile', verifyAuth, (req, res) => {
  res.send({
    email: req.user.email,
    name: req.user.name,
    location: req.user.location,
    bio: req.user.bio,
  });
});

// Update user profile
apiRouter.put('/profile', verifyAuth, (req, res) => {
  const { name, location, bio } = req.body;

  if (typeof name === 'string') {
    req.user.name = name;
  }

  if (typeof location === 'string') {
    req.user.location = location;
  }

  if (typeof bio === 'string') {
    req.user.bio = bio;
  }

  res.send({
    email: req.user.email,
    name: req.user.name,
    location: req.user.location,
    bio: req.user.bio,
  });
});

// Unknown API endpoint
apiRouter.use((_req, res) => {
  res.status(404).send({
    msg: 'API endpoint not found',
  });
});

// Default error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).send({
    msg: 'Internal server error',
  });
});

// React frontend fallback
app.use((_req, res) => {
  res.sendFile(
    path.join(__dirname, 'public', 'index.html')
  );
});

// Start the server
app.listen(port, () => {
  console.log(`NearbySitter service listening on port ${port}`);
});