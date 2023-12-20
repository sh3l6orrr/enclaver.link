'use server'

import url from "../../url";

export async function createPost(token, formData) {
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${token}`)

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: formData,
  };
  const res = await fetch(url + '/posts', requestOptions)
  return { ok: res.ok, msg: await res.text() }
}
export async function getUsername(token) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);
  const res = await fetch(url + '/username', {
    method: 'GET',
    headers: headers
  })
  if (res.ok) {
    const username = await res.text()
    return username
  } else {
    return null
  }
}