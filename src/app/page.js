import React from "react"
import url from "./url"
import { Space, Seperator } from "./util"
import Item from "./Item.jsx"

export default async function Page() {
  const items = await loadLatest()
  function NoResultsSign() {
    return <>
      <Space h="1rem" />
      <i>No results found</i>
    </>

  }
  function Results() {
    return <>
      <Seperator />
      {items.length !== 0 ? items.map(item => <Item key={item.id} item={item} />)
        : <NoResultsSign />}
    </>
  }
  return <>
    <h1>Latest</h1>
    <Results />
  </>
}

async function loadLatest() {
  const response = await fetch(url + '/posts')
  return await response.json()
}