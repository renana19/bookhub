// backend/index.js
import app from './app.js';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';


dotenv.config(); // מאפשר שימוש ב־.env

const PORT = process.env.PORT || 3000;
app.use('/api/users', userRoutes);
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
