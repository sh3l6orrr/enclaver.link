'use server'

import url from "../src/url"

export async function getLatest() {
  const res = await fetch(url + '/posts', { cache: 'no-store' })
  const latest = await res.json()
  return latest
}