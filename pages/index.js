import React from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import PropTypes from 'prop-types'

const Index = props => (
  <div>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(show => (
        <li key={show.id}>
          <Link href='/shows/[id]' as={`/shows/${show.id}`}>
            {show.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

Index.propTypes = {
  shows: PropTypes.array
}

Index.getInitialProps = async () => {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()
  console.debug(`Show data fetched. Count: ${data.length}`)
  return { shows: data.map(entry => entry.show) }
}

export default Index
