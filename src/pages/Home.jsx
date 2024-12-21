import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


export function Home() {

  const [height, setHeight] = useState()

  function handleHeight(event) {
    setHeight((event.target.value) * 4)
  }

  return (
    <section className="home">
      <h2>The Home of Toys</h2>
      <Box sx={{ width: 300 }}>
        <Slider onChange={handleHeight} defaultValue={30} aria-label="Default" valueLabelDisplay="auto" />
      </Box>
      <img src="toy.svg" style={{ height: height}} />
    </section>


  )
}


