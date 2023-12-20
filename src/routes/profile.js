import url from "../util"
import { json } from 'react-router-dom';

export async function loader({ params }) {
  const response1 = await getProfile(params.username);
  const response2 = await getPosts(params.username);
  const response3 = await getComments(params.username);
  const data = { 
    profile: await response1.json(),
    posts: await response2.json(),
    comments: await response3.json()
  }
  return json(data)
}

export async function action({ request, params }) {
  const data = await request.formData()
  switch (request.method) {
    case "PUT" : {
      const response = await updateProfile(params.username, data);
      alert({ message: await response.text(), status: response.ok })
      return json(null)
    }
  }
}

async function getProfile(username) {
  return await fetch(url + `/profile/${username}`)
}

async function getPosts(username) {
  return await fetch(url + `/profile/${username}/posts`)
}
async function getComments(username) {
  return await fetch(url + `/profile/${username}/comments`)
}
async function updateProfile(username, data) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${ localStorage.getItem('token') }`)
  const requestOptions = {
    method: 'PUT',
    headers: headers,
    body: new URLSearchParams(data),
  };
  return await fetch(url + `/profile/${ username }`, requestOptions)
}