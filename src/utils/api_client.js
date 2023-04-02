import axios from 'axios';

// CORS enabled apikey
const apikey = process.env.REACT_APP_RESTDB_API_KEY;
const URL = process.env.REACT_APP_RESTDB_BASE_URL;

const restdb = axios.create({
  baseURL: `${URL}/rest`,
  headers: {
    'Content-Type': 'application/json',
    'x-apikey': apikey,
    'cache-control': 'no-cache'
  }
});
// Eventsource endpoint
//const realtimeURL = `${URL}/realtime?apikey=${apikey}`;

const restdbGet = async (endpoint) => {
  try {
    const res = await restdb.get(endpoint);

    const data = res.data;

    return data;
  } catch (error) {
    console.log(error);
  }
};

const restdbPut = async (endpoint, body) => {
  try {
    let res = await restdb.put(endpoint, body);
    if (res.status === 200) {
      return 'success';
    }
  } catch (error) {
    return console.log(error);
  }
};

export { restdb, restdbGet, restdbPut };
