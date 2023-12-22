import url from "../../../../../url";

export async function getItem(id) {
  const res = await fetch(url + `/item/${id}`, { cache: 'no-store' });
  return await res.json();
}

export async function getItemComments(id) {
  const res = await fetch(url + `/item/${id}/comments`, { cache: 'no-store' });
  const itemComments = await res.json();
  return itemComments
}