import React from 'react'
import fetch from 'isomorphic-unfetch'
import PropTypes from 'prop-types'

const Post = props => {
  const paragraphs = props.show.summary
    .split(/(<p>|<\/p>)/)
    .filter(element => element !== '' && !/(<p>|<\/p>)/.test(element))
    .map(p => p.split(/(<b>|<\/b>)/).filter(element => element !== '' && !/(<b>|<\/b>)/.test(element)).join(' '))
    .map(element => <p key={element}>{element}</p>)
  return (
    <div>
      <h1>{props.show.name}</h1>
      {paragraphs}
      {props.show.image ? <img src={props.show.image.medium} /> : null}
    </div>
  )
}

Post.propTypes = {
  show: PropTypes.object
}

Post.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()
  console.debug(`Fetched show: ${show.name}`)
  return { show }
}

export default Post
