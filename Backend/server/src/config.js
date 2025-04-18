const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer'); // For handling file uploads
const GridFSStream = require('gridfs-stream'); // For storing files in MongoDB
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// MongoDB Connection
mongoose
  .connect('mongodb://localhost:27017/mylogin')
  .then(() => console.log('Database connected successfully!'))
  .catch((error) => console.error('Database connection error:', error));

// Initialize GridFSStream
const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
  gfs = GridFSStream(conn.db, mongoose.mongo);
  gfs.collection('uploads'); // Store the uploaded files in 'uploads' collection
});

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.get('/task', (req, res) => {
  res.render('task'); // Render the task page
});

// Store uploaded file in MongoDB
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const writeStream = gfs.createWriteStream({
    filename: req.file.originalname,
    content_type: req.file.mimetype,
  });

  writeStream.write(req.file.buffer);
  writeStream.end();

  writeStream.on('close', (file) => {
    // Save file info in the database
    // Save the file metadata, e.g., file ID and associated user, chapter, etc.
    // You can also store the chapter/subtask completion status here in MongoDB.

    res.send('File uploaded successfully!');
  });
});

// Routes for chapters and subtasks (add logic to update database on completion)
app.post('/complete-task', async (req, res) => {
  const { chapter, subtask, userId } = req.body;
  try {
    // Mark chapter/subtask as completed in the database
    // You can store this data in a `tasks` or `user_progress` collection

    res.send('Task completed!');
  } catch (error) {
    res.status(500).send('Error completing task: ' + error.message);
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
