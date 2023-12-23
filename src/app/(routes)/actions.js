'use server'

import url from "../../url";

export async function getUsername(token) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);
  const res = await fetch(url + '/username', {
    method: 'GET',
    headers: headers,
    cache: 'no-store'
  })
  if (res.ok) {
    const username = await res.text()
    return username
  } else {
    return null
  }
}