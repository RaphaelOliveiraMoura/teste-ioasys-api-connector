import { Router } from 'express';
import axios from 'axios';
import https from 'https';

const ioasysApi = axios.create({
  baseURL: process.env.API_IOASYS_URL
});

const routes = new Router();

routes.post('/users/auth/sign_in', async (req, res) => {
  try {
    const response = await ioasysApi.post('/users/auth/sign_in', req.body, {
      timeout: 1000 * 60 * 4,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });

    const { uid, client } = response.headers;

    return res
      .set({
        uid,
        client,
        'access-token': response.headers['access-token']
      })
      .json(response.data);
  } catch (error) {
    const { response } = error;

    return res.status(response.status).json(response.data);
  }
});

routes.get('/enterprises', async (req, res) => {
  try {
    if (
      !req.headers.uid ||
      !req.headers.client ||
      !req.headers['access-token']
    ) {
      return res
        .status(400)
        .json({ message: 'You need provide headers auth params' });
    }

    const response = await ioasysApi.get('/enterprises', {
      params: req.query,
      headers: {
        uid: req.headers.uid,
        client: req.headers.client,
        'access-token': req.headers['access-token']
      },
      timeout: 1000 * 60 * 4,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });

    return res.json(response.data);
  } catch (error) {
    console.log(error);

    const { response } = error;

    return res.status(response.status).json(response.data);
  }
});

export default routes;
