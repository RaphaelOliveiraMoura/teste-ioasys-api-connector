import { Router } from 'express';
import axios from 'axios';
import https from 'https';

const ioasysApi = axios.create({
  baseURL: process.env.API_IOASYS_URL
});

ioasysApi.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ETIMEDOUT') {
      console.log('Timeout, resend request...');

      return ioasysApi(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);

const routes = new Router();

const defaultHeaders = {
  Accept: '*/*',
  'Cache-Control': 'no-cache',
  Host: 'empresas.ioasys.com.br',
  'Accept-Encoding': 'gzip, deflate',
  Cookie:
    '_sturtup-games-backend_session=OWpvZHlDVEdNNi9pdEZ6bDUwWDhVamttRkFFZGlJS1R1Y3ViaG5xNjI5MkUxM09FcGNtdTNncnpwMUtBUmZnYi9reVdZa3J1NTdkOEZGZkZ0UGxTa3VOYnNadGRRRkd0cmV5MmdyODcwdmpWeGpkRldseklqUGtTTWZJbXZhUGFRQkRqZ0Z5MzRSbFBGbG5sbEI1NWhBPT0tLTlRaGEzRVpBb1ZJWGxlTisxS1dTdFE9PQ%3D%3D--fcbafbb9a2925bcce2a093f6945a6ccb396a6c60',
  Connection: 'keep-alive'
};

routes.post('/users/auth/sign_in', async (req, res) => {
  try {
    const response = await ioasysApi.post('/users/auth/sign_in', req.body, {
      timeout: 1000 * 60,
      headers: { ...defaultHeaders },
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
    const { response: errorResponse } = error;

    if (errorResponse && errorResponse.status === 401) {
      return res.status(401).json(errorResponse.data);
    }

    return res.status(500).json({ error: 'Internal Server Error' });
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
        ...defaultHeaders,
        uid: req.headers.uid,
        client: req.headers.client,
        'access-token': req.headers['access-token']
      },
      timeout: 1000 * 60,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });

    return res.json(response.data);
  } catch (error) {
    const { response: errorResponse } = error;

    console.log(error);

    if (errorResponse && errorResponse.status === 401) {
      return res.status(401).json(errorResponse.data);
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

routes.get('/enterprises/:id', async (req, res) => {
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

    const response = await ioasysApi.get(`/enterprises/${req.params.id}`, {
      params: req.query,
      headers: {
        ...defaultHeaders,
        uid: req.headers.uid,
        client: req.headers.client,
        'access-token': req.headers['access-token']
      },
      timeout: 1000 * 60,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });

    return res.json(response.data);
  } catch (error) {
    const { response: errorResponse } = error;

    if (errorResponse && errorResponse.status === 401) {
      return res.status(401).json(errorResponse.data);
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default routes;
