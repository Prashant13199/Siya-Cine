import React from 'react'
import './style.css'
import { useHistory } from 'react-router-dom'

export default function SingleContentScroll({ data, type }) {

  const history = useHistory()

  return data?.poster_path && ( 
    <img
      src={data?.poster_path ? `https://image.tmdb.org/t/p/w500/${data?.poster_path}` : "https://www.movienewz.com/img/films/poster-holder.jpg"}
      alt={data?.title || data?.name}
      className="poster_scroll"
      onClick={() => history.push(`/singlecontent/${data.id}/${type ? type : data.media_type}`)}
    />
  )
}