'use server'

import url from "../../../../url";

export async function getProfile(username) {
  const res = await fetch(url + `/profile/${username}`, { cache: 'no-store' })
  const profile = await res.json()
  return profile
}
export async function updateProfile(token, formData) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`)
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: formData,
    cache: 'no-store'
  };
  const res = await fetch(url + `/profile/update`, requestOptions)
  const { success, msg } = await res.json()
  return { success: success, msg: msg }
}

export async function getPosts(username) {
  const res = await fetch(url + `/profile/${username}/posts`, { cache: 'no-store' })
  const posts = await res.json()
  return posts
}