import url from "../../src/url"

export async function search(query) {
  const res =  await fetch(url + `/search/${query}`)
  const results = await res.json()
  return results
}