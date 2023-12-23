'use server'

import url from "@/url"

export async function signUp(formData) {
  const res = await fetch(url + '/signup', {
    method: 'POST',
    body: formData,
    cache: 'no-store'
  })
  const { success, msg } = await res.json()
  return { success: success, msg: msg }
}
