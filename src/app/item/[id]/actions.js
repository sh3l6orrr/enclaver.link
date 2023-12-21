import url from "../../../url";

export async function getItem(id) {
  const res = await fetch(url + `/item/${id}`, { cache: 'no-store' });
  let item
  try {
    item = await res.json();
  } catch {
    item = null
  }
  return item
}

export async function getItemComments(id) {
  const res = await fetch(url + `/item/${id}/comments`, { cache: 'no-store' });
  const itemComments = await res.json();
  return itemComments
}