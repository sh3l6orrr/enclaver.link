import url from "../util"
import { json } from 'react-router-dom';

export async function loader() {
  const response = await getNotifications();
  if (!response.ok) {
    const data = { notifications: null }
    return json(data)
  }
  const data = { notifications: await response.json() }
  return json(data)
}

export async function action() {
    const response = await readAllNotifications()
    alert({ message: await response.text(), color: response.ok ? "green" : "red" })
    return json(null)
}

async function getNotifications() {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${ localStorage.getItem('token') }`)
  const requestOptions = {
    headers: headers
  };
  return await fetch(url + "/messages", requestOptions)
}

async function readAllNotifications() {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${ localStorage.getItem('token') }`)
  const requestOptions = {
    method: 'POST',
    headers: headers
  };
  return await fetch(url + "/messages", requestOptions)
}