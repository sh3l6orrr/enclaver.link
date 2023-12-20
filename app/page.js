import React from "react"
import url from "../src/url.js"
import { Space, Seperator } from "../src/util.jsx"
import Item from "../src/components/item/Item.jsx"

export default async function Page() {
  const items = await getLatest()
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

async function getLatest() {
  const res = await fetch(url + '/posts')
  const latest = await res.json()
  return latest
}