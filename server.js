const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! SHUTTING DOWN...');
  console.log(err.name, err.message);
  process.exit(1);
});

// Load environment variables
dotenv.config({ path: './config.env' });

const app = require('./app');

// Construct database connection string
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

// Connect to MongoDB
mongoose
  .connect(DB, {})
  .then(() =>
    console.log('MongoDB connected successfully'),
  );

// Start server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! SHUTTING DOWN...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
