import React from "react"
import url from "../url"
import { Space, Seperator } from "../util"
import Item from "../Item.jsx"

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

async function search(query) {
  const response = await fetch(url + `/search/${query}`)
  return await response.json()
}