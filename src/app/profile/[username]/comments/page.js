import { Seperator, Space } from "../../../../util.jsx"
import React from "react"
import Item from "../../../../components/item/Item.jsx"
import { getComments } from "./actions.js"

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
    {comments.length !== 0 ? comments.map((comment) => <Item id={comment.id} key={comment.id} />)
      : <NoCommentsSign />}
  </>
}

