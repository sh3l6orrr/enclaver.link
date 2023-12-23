'use server'

import url from "@/url";

export async function changePassword(token, formData) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`)
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: formData,
    cache: 'no-store'
  };
  const res = await fetch(url + `/profile/changepwd`, requestOptions)
  const { success, msg } = await res.json()
  return { success: success, msg: msg }
}