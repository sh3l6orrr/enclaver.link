'use server'
import url from "../../../src/url";

export async function getPosts(username) {
  const res = await fetch(url + `/profile/${username}/posts`)
  const posts = await res.json()
  return posts
}

export async function getProfile(username) {
  const res = await fetch(url + `/profile/${username}`)
  const profile = await res.json()
  return profile
}
export async function updateProfile(token, username, formData) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`)
  const requestOptions = {
    method: 'PUT',
    headers: headers,
    body: formData,
  };
  const res = await fetch(url + `/profile/${username}`, requestOptions)
  return { ok: res.ok, msg: await res.text() }
}