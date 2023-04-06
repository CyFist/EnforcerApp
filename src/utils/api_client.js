import axios from "axios";

// CORS enabled apikey
const apikey = "63eca0d0478852088da682d1"; //process.env.REACT_APP_RESTDB_API_KEY;
const URL = "https://enforcer-88e7.restdb.io"; //process.env.REACT_APP_RESTDB_BASE_URL;

const restdb = axios.create({
  baseURL: `${URL}/rest`,
  headers: {
    "Content-Type": "application/json",
    "x-apikey": apikey,
    "cache-control": "no-cache",
  },
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

const restdbPost = async (endpoint, usernames) => {
  try {
    const body = usernames.map((username) => {
      const userbody = {
        User: username,
        BF_Date: null,
        Quiz_Date: null,
        Valid: false,
      };

      return userbody;
    });

    let res = await restdb.post(endpoint, body);
    if (res.status === 200) {
      return "success";
    }
  } catch (error) {
    console.log(error);
  }
};

const restdbPut = async (endpoint, body) => {
  try {
    let res = await restdb.put(endpoint, body);
    if (res.status === 200) {
      return "success";
    }
  } catch (error) {
    return console.log(error);
  }
};

const restdbDelete = async (endpoint, arr) => {
  const body = { data: arr };
  try {
    let res = await restdb.delete(endpoint, body);
    if (res.status === 200) {
      return console.log(res);
    }
  } catch (error) {
    return console.log(error);
  }
};

export { restdb, restdbGet, restdbPost, restdbPut, restdbDelete };
