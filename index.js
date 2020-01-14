import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import routes from './src/routes';

const app = express();

app.use(express.json());
app.use(cors({ exposedHeaders: ['uid', 'client', 'access-token'] }));
app.use('/api/v1', routes);

app.listen(3333, () => console.log('Server running...'));
