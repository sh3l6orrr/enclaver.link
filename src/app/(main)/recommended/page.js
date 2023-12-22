import React from "react"
// import url from "../url"
import { Space, Seperator } from "../../../util.jsx"
import Item from "../../../components/item/Item.jsx"

export const metadata = {
  title: 'Recommended',
  content: 'The best of Enclaver.'
}

export default async function Page() {
  // const res= await rec()
  // const items = await res.json()
  const items = []

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
    <h1>Recommended</h1>
    <Results />
  </>
}

// async function rec() {
//   const response = await fetch(url + `/recommended`)
//   return []
// }