import { Seperator, Space } from "../../../util.jsx"
import React from "react"
import Item from "../../../components/item/Item.jsx"
import { getPosts } from "./actions.js"

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

