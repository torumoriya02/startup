const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { randomUUID } = require('node:crypto');
const path = require('node:path');

const DB = require('./database.js');

const app = express();

const port = process.argv.length > 2
  ? Number(process.argv[2])
  : 4000;

const authCookieName = 'token';

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initial babysitter data
const initialSitters = [
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

// Authentication cookie
function setAuthCookie(res, token) {
  res.cookie(authCookieName, token, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Verify authentication using MongoDB
async function verifyAuth(req, res, next) {
  const user = await DB.getUserByToken(
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
  const { email, password } = req.body || {};

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

  if (await DB.getUser(normalizedEmail)) {
    return res.status(409).send({
      msg: 'User already exists',
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    id: randomUUID(),
    email: normalizedEmail,
    password: passwordHash,
    token: randomUUID(),
    name: normalizedEmail.split('@')[0],
    location: '',
    bio: '',
  };

  try {
    await DB.addUser(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).send({
        msg: 'User already exists',
      });
    }

    throw error;
  }

  setAuthCookie(res, user.token);

  res.send({
    email: user.email,
  });
});

// Login
apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    Buffer.byteLength(password, 'utf8') > 72
  ) {
    return res.status(400).send({
      msg: 'Invalid credentials',
    });
  }

  const user = await DB.getUser(
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

  const token = randomUUID();

  await DB.updateUser(user.id, { token });

  setAuthCookie(res, token);

  res.send({
    email: user.email,
  });
});

// Logout
apiRouter.delete('/auth/logout', async (req, res) => {
  await DB.removeUserToken(
    req.cookies[authCookieName]
  );

  res.clearCookie(authCookieName, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });

  res.status(204).end();
});

// Get authenticated user
apiRouter.get('/auth/me', verifyAuth, (req, res) => {
  res.send({
    email: req.user.email,
    name: req.user.name,
  });
});

// Get babysitters from MongoDB
apiRouter.get('/sitters', async (req, res) => {
  const sitters = await DB.getSitters();

  res.send(sitters);
});

// Get messages from MongoDB
apiRouter.get('/messages', verifyAuth, async (req, res) => {
  const messages = await DB.getMessages(req.user.id);

  res.send(messages);
});

// Send a message
apiRouter.post('/messages', verifyAuth, async (req, res) => {
  const { sitterId, text } = req.body || {};

  const sitter = await DB.getSitter(sitterId);

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

  await DB.addMessage(message);

  // Simulated babysitter reply
  setTimeout(async () => {
    try {
      await DB.addMessage({
        id: randomUUID(),
        userId: message.userId,
        sitterId: sitter.id,
        sitterName: sitter.name,
        sender: sitter.name,
        text: 'Thanks for your message! I will get back to you soon.',
        time: new Date().toISOString(),
      });
    } catch {
      console.error('Unable to save simulated reply');
    }
  }, 5000);

  res.status(201).send(message);
});

// Get booking requests
apiRouter.get('/bookings', verifyAuth, async (req, res) => {
  const bookings = await DB.getBookings(req.user.id);

  res.send(bookings);
});

// Create booking request
apiRouter.post('/bookings', verifyAuth, async (req, res) => {
  const { sitterId, date, message } = req.body || {};

  const sitter = await DB.getSitter(sitterId);

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

  await DB.addBooking(booking);

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
apiRouter.put('/profile', verifyAuth, async (req, res) => {
  const { name, location, bio } = req.body || {};

  const updates = {};

  if (typeof name === 'string') {
    updates.name = name;
  }

  if (typeof location === 'string') {
    updates.location = location;
  }

  if (typeof bio === 'string') {
    updates.bio = bio;
  }

  if (Object.keys(updates).length > 0) {
    await DB.updateUser(req.user.id, updates);
  }

  const updatedUser = {
    ...req.user,
    ...updates,
  };

  res.send({
    email: updatedUser.email,
    name: updatedUser.name,
    location: updatedUser.location,
    bio: updatedUser.bio,
  });
});

// Unknown API endpoint
apiRouter.use((_req, res) => {
  res.status(404).send({
    msg: 'API endpoint not found',
  });
});

// React frontend fallback
app.use((_req, res) => {
  res.sendFile(
    path.join(__dirname, 'public', 'index.html')
  );
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Request failed:', err.name);

  res.status(500).send({
    msg: 'Internal server error',
  });
});

// Connect to MongoDB before starting the server
async function startServer() {
  try {
    await DB.connectDatabase(initialSitters);

    app.listen(port, () => {
      console.log(
        `NearbySitter service listening on port ${port}`
      );
    });
  } catch (error) {
    console.error(
      'Unable to initialize database:',
      error.name,
      error.code || ''
    );

    process.exit(1);
  }
}

startServer();