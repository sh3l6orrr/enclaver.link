import React from "react"
import { Space, Seperator } from "../src/util.jsx"
import Item from "../src/components/item/Item.jsx"
import { getLatest } from "./actions.js"

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
      {items.length !== 0 ? items.map(item => <Item key={item.id} id={item.id} />)
        : <NoResultsSign />}
    </>
  }
  return <>
    <h1>Latest</h1>
    <Results />
  </>
}

