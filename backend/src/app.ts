import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import {
  errorMiddleware,
  notFoundMiddleware,
} from './middleware/errorMiddleware.js';
import {analysisRoutes} from './modules/analyses/analysis.routes.js';
import {authRoutes} from './modules/auth/auth.routes.js';
import {profileRoutes} from './modules/profiles/profile.routes.js';
import {userRoutes} from './modules/users/user.routes.js';

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({limit: '1mb'}));
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.json({status: 'ok', service: 'rolefit-ai-backend'});
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/analyses', analysisRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
