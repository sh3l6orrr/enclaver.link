'use server'

import url from "../../../../url"

export async function signIn(formData) {
  const res = await fetch(url + '/signin', {
    method: 'POST',
    body: formData,
    cache: 'no-cache'
  })
  const { success, msg, token } = await res.json()

  return { success: success, msg: msg, token: token }
}