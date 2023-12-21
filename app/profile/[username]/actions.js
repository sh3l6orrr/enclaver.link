'use server'
import { revalidateTag } from "next/cache";
import url from "../../../src/url";

export async function getProfile(username) {
  const res = await fetch(url + `/profile/${username}`, { next: { tags: [`/profile/${username}`] } })
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
    cache: 'no-store'
  };
  const res = await fetch(url + `/profile/${username}`, requestOptions)
  revalidateTag(`/profile/${username}`)
  return { ok: res.ok, msg: await res.text() }
}

export async function getPosts(username) {
  const res = await fetch(url + `/profile/${username}/posts`, { cache: 'no-store'})
  const posts = await res.json()
  return posts
}