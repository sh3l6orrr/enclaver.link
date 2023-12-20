import url from "../../../src/url";

export async function getItem(id) {
  const res = await fetch(url + `/item/${id}`);
  const item = await res.json();
  return item
}

export async function getItemComments(id) {
  const res = await fetch(url + `/item/${id}/comments`);
  const itemComments = await res.json();
  return itemComments
}