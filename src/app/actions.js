'use server'

import url from "../url"

export async function getUsername(token) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);
  const res = await fetch(url + '/username', {
    method: 'GET',
    headers: headers,
    cache: 'no-cache'
  })
  if (res.ok) {
    const username = await res.text()
    return username
  } else {
    return null
  }
}

export async function getLatest() {
  const res = await fetch(url + '/posts', { cache: 'no-store' })
  const latest = await res.json()
  return latest
}

export async function createPost(token, formData) {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${token}`)

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: formData,
    cache: 'no-cache'
  };
  const res = await fetch(url + '/posts', requestOptions)
  return { ok: res.ok, msg: await res.text() }
}