'use server'

import url from "../../src/url.js"

export async function getNotifs(token) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`)
  const requestOptions = {
    headers: headers
  };
  const res = await fetch(url + "/messages", requestOptions)
  const messages = await res.json()
  return messages
}
export async function readAllNotifs(token) {
  const requestOptions = {
    method: "POST",
    headers: new Headers({
      'Authorization': `Bearer ${token}`
    })
  };
  const res = await fetch(url + "/messages", requestOptions);
  return { ok: res.ok, msg: await res.text() }
}