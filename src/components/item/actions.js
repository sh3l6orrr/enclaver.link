'use server'

import url from "@/url";

export async function likeItem(token, id) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`)
  const requestOptions = {
    method: 'POST',
    headers: headers,
    cache: 'no-store'
  };

  const res = await fetch(url + `/item/${id}/like`, requestOptions)
  const { success, msg } = await res.json()
  return { success: success, msg: msg }
}
export async function commentItem(token, id, formData) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`)
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: formData,
    cache: 'no-store'
  };
  const res = await fetch(url + `/item/${id}/comment`, requestOptions)
  const { success, msg, newId } = await res.json()
  return { success: success, msg: msg, newId: newId }
}

export async function updateItem(token, id, formData) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`)
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: formData,
    cache: 'no-store'
  };
  const res = await fetch(url + `/item/${id}/edit`, requestOptions)
  const { success, msg } = await res.json()
  return { success: success, msg: msg }

}

export async function deleteItem(token, id) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`)
  const requestOptions = {
    method: 'POST',
    headers: headers,
    cache: 'no-store'
  };
  const res = await fetch(url + `/item/${id}/delete`, requestOptions)
  const { success, msg } = await res.json()
  return { success: success, msg: msg }
}