import url from "../../../src/url";

export async function getItemComments(id) {
  const res = await fetch(url + `/item/${id}/comments`, { cache: 'no-store' });
  const itemComments = await res.json();
  return itemComments
}