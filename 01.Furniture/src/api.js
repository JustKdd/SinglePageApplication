import { userData } from "./userDataHelper.js";
const host = "http://localhost:3030/";
async function reguester(method, url, data) {
  const options = {
    method: method,
    headers: {},
  };
  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }
  const userInfo = userData.getUserData();
  if (userInfo) {
    options.headers["x-authorization"] = userInfo.accessToken;
  }

  try {
    const response = await fetch(host + url, options);
    if (response.ok === false) {
      const error = await response.json();
      throw new Error(error.message);
    }
    if (response.status === 204) {
      return response;
    }

    return await response.json();
  } catch (error) {
    alert(error);
    throw error;
  }
}

export function get(url) {
  return reguester("GET", url);
}

export function post(url, data) {
  return reguester("POST", url, data);
}

export function put(url, data) {
  return reguester("PUT", url, data);
}

export function del(url) {
  return reguester("DELETE", url);
}
