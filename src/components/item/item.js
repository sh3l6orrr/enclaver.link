import url from "../../url";

export async function likeItem(token, id) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`)
  const requestOptions = {
    method: 'POST',
    headers: headers
  };
  const res = await fetch(url + `/item/${id}/like`, requestOptions)
  return {ok: res.ok, msg: await res.text()}
}
export async function commentItem(token, id, formData) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`)
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: formData
  };
  const res = await fetch(url + `/item/${id}/comment`, requestOptions)
  return {ok: res.ok, msg: await res.text()}
}

export async function updateItem(token,id, formData) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`)
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: formData
  };
  const res = await fetch(url + `/item/${id}/edit`, requestOptions)
  return {ok: res.ok, msg: await res.text()}

}

export async function deleteItem(token,id) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`)
  const requestOptions = {
    method: 'POST',
    headers: headers
  };
  const res = await fetch(url + `/item/${id}/delete`, requestOptions)
  return {ok: res.ok, msg: await res.text()}
}