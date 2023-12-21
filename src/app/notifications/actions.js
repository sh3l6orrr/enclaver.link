'use server'

import { revalidatePath } from "next/cache.js";
import url from "../../url.js"

export async function getNotifs(token) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`)
  const requestOptions = {
    headers: headers,
    cache: 'no-store'
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
    }),
    cache: 'no-store'
  };
  const res = await fetch(url + "/messages", requestOptions);
  revalidatePath('messages')
  return { ok: res.ok, msg: await res.text() }
}