'use server'

import { revalidateTag } from "next/cache";
import url from "../../url";

export async function getItem(id) {
  const res = await fetch(url + `/item/${id}`, { next: { tags: [`/item/${id}`] } });
  let item
  try {
    item = await res.json();
  } catch {
    item = null
  }
  return item
}

export async function likeItem(token, id) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`)
  const requestOptions = {
    method: 'POST',
    headers: headers,
    cache: 'no-store'
  };

  const res = await fetch(url + `/item/${id}/like`, requestOptions)
  revalidateTag(`/item/${id}`)
  return { ok: res.ok, msg: await res.text() }
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
  revalidateTag(`/item/${id}`)
  return { ok: res.ok, msg: await res.text() }
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
  revalidateTag(`/item/${id}`)
  return { ok: res.ok, msg: await res.text() }

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
  revalidateTag(`/item/${id}`)
  return { ok: res.ok, msg: await res.text() }
}