import url from "../util"
import { json } from 'react-router-dom';

export async function action({ request }) {
  const data = await request.formData()
  const response = await createPost(data)
  alert({ message: await response.text(), status: response.ok})
  return json(null)
}

async function createPost(data) {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
  
  const requestOptions  = {
    method: 'POST',
    headers: headers,
    body: new URLSearchParams(data), 
  };
  return await fetch(url + '/posts', requestOptions)
}