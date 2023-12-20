import { Seperator, Space } from "../../../util"
import React from "react"
import Item from "../../../Item.jsx"
import url from "../../../url.js"

export default async function Page({ params }) {

  const comments = await getComments(params.username)

  function NoCommentsSign() {
    return <>
      <Space h="1rem" />
      <i>No comments yet.</i>
    </>
  }
  return <>
    <Seperator />
    {comments.length !== 0 ? comments.map((comment) => <Item item={comment} key={comment.id} />)
      : <NoCommentsSign />}
  </>
}

async function getComments(username) {
  const res = await fetch(url + `/profile/${username}/comments`)
  return await res.json()
}