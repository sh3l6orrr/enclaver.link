import url from "../util"
import { json } from "react-router-dom"


export async function searchLoader({ request }) {
  const u = new URL(request.url);
  const q = u.searchParams.get("q");
  const response = await fetch(url + `/search/${q}`)
  const data = { items: await response.json() }
  return json(data)
}

export async function searchUsersLoader({ request }) {
  const u = new URL(request.url);
  const q = u.searchParams.get("q");
  const response = await fetch(url + `/search/${q}/users`)
  const data = { items: await response.json() }
  return json(data)
}

export async function latestLoader() {
  const response = await fetch(url + '/posts')
  const data = { items: await response.json() }
  return json(data)
}

export async function recommendedLoader() {
  const data = { items: [] }
  return json(data)
}

