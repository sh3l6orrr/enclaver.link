import { Seperator, Space } from "../../util"
import React from "react"
import Item from "../../Item.jsx"
import url from "../../url.js"

export default async function Page({ params }) {

  const posts = await getPosts(params.username)

  function NoPostsSign() {
    return <>
      <Space h="1rem" />
      <i>No posts yet.</i>
    </>
  }
  return <>
    <Seperator />
    {posts.length !== 0 ? posts.map((post) => <Item item={post} key={post.id} />)
      : <NoPostsSign />}
  </>
}

async function getPosts(username) {
  const res = await fetch(url + `/profile/${username}/posts`)
  return await res.json()
}