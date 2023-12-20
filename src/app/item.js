import url from "./url";

export async function likeItem(id) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
  const requestOptions = {
    method: 'POST',
    headers: headers
  };
  return await fetch(url + `/item/${id}/like`, requestOptions)
}
export async function commentItem(id, data) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: new URLSearchParams(data)
  };
  return await fetch(url + `/item/${id}/comment`, requestOptions)
}

export async function updateItem(id, data) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: new URLSearchParams(data),
  };
  return await fetch(url + `/item/${id}/edit`, requestOptions)

}

export async function deleteItem(id) {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
  const requestOptions = {
    method: 'POST',
    headers: headers
  };
  return await fetch(url + `/item/${id}/delete`, requestOptions)
}