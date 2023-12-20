import React from 'react'
import { Space } from '../../util.jsx'
import Item from '../../Item.jsx'
import url from '../../url.js';

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

async function getItem(id) {
  const res = await fetch(url + `/item/${id}`);
  return await res.json();
}

async function getItemComments(id) {
  const res = await fetch(url + `/item/${id}/comments`);
  return await res.json();
}