import url from "../../../../../../url"

export async function getComments(username) {
  const res = await fetch(url + `/profile/${username}/comments`)
  const comments = await res.json()
  return comments
}