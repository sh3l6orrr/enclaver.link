import React from 'react'
import { Space } from '../../../src/util.jsx'
import Item from '../../../src/components/item/Item.jsx'
import { getItem, getItemComments } from './actions.js'

export default async function ItemView({params}) {

  const post = await getItem(params.id)
  const comments = await getItemComments(params.id)

  function CommentItem({ comment }) {
    return <>
      <li>
        <Item item={comment} />
        <CommentList comments={comment.comments_content} />
      </li>
    </>
  }

  function CommentList({ comments }) {
    return <>
      <ul>
        {comments.map((comment) => <CommentItem comment={comment} key={comment.id} />)}
      </ul>
    </>
  }

  function NoCommentsSign() {
    return <>
      <Space h="1rem" />
      <div style={{ fontSize: "small" }}>
        <i>There are no comments yet. Be the first!</i>
      </div>
    </>
  }
  return <>
    <Item item={post} isPost={true} />

    {comments.length !== 0 ? <CommentList comments={comments} /> : <NoCommentsSign />}
  </>
}

