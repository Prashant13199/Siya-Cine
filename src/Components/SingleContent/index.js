import React, { useEffect } from 'react'
import './style.css'
import { useHistory } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function SingleContent({ data, type }) {
  const history = useHistory()
  useEffect(() => {
    AOS.init({ duration: 800 })
  })
  return data?.poster_path && (
    <Grid xs={2} sm={4} md={4} key={data.id} data-aos="fade-up">
      <img
        src={data?.poster_path ? `https://image.tmdb.org/t/p/w500/${data?.poster_path}` : "https://www.movienewz.com/img/films/poster-holder.jpg"}
        alt={data?.title || data?.name}
        className="poster"
        onClick={() => history.push(`/singlecontent/${data.id}/${type ? type : data.media_type}`)}
      />
    </Grid>
  )
}
