import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import OutlinedCard from './CardBlock';

export default function Home() {
    const [cardData,setCardData] = useState([]); 

 useEffect(()=>{ 
    fetchData() 
  },[]); 
    
    const fetchData = () => { 
        fetch(`${process.env.REACT_APP_SERVER_URL}/getCodesBlocks`) 
          .then(response => response.json()) 
          .then(jsonResponse => setCardData(jsonResponse)) 
          .catch(error => console.log(error)) 
      }; 

    return (
        <>
        <h1>Choose code block</h1>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {cardData.map((item, index) => (
                <Grid item xs={6} key={index}>
                    <Link to ={`/CodeBlock/${item.codeId}`}>
                    <OutlinedCard title={item.title} link={item.codeId} guildLines={item.guildLines} />
                    </Link>
                </Grid>
            ))}
        </Grid>
        </>
    );
}
