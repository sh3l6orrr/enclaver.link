import React from "react"
// import url from "../url"
import { Space, Seperator } from "../util"
import Item from "../Item.jsx"

export default async function Page() {
  const items = await rec()
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
    <h1>Recommended</h1>
    <Results />
  </>
}

async function rec() {
  // const response = await fetch(url + `/recommended`)
  return []
}