import React from "react"
import { Space, Seperator } from "../../util.jsx"
import Item from "../../components/item/Item.jsx"
import { search } from "./actions.js"

export default async function Page({ searchParams }) {
  const items = await search(searchParams.query)
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
    <h1>Search</h1>
    <Results />
  </>
}

