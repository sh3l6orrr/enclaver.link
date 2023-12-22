'use server'

import url from "../../url.js"

export async function signIn(formData) {
  const res = await fetch(url + '/signin', {
    method: 'POST',
    body: formData,
    cache: 'no-cache'
  })
  const { success, msg, token } = await res.json()

  return { success: success, msg: msg, token: token }
}

export async function signUp(formData) {
  const res = await fetch(url + '/signup', {
    method: 'POST',
    body: formData,
    cache: 'no-cache'
  })
  const { success, msg } = await res.json()
  return { success: success, msg: msg }
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
  const { success, msg, newId } = await res.json()
  return { success: success, msg: msg, newId: newId }
}