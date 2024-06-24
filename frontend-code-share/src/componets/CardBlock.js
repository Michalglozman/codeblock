import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const getCard = (title, guildLines) => (
  <CardContent>
    <Typography variant="h4" component="div" gutterBottom>
      {title}
    </Typography>
    <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="body2">
      <br />

      <div className="truncate-to-2-lines"> {guildLines}</div>
      <br />
      <b>Click to learn more</b>
    </Typography>
  </CardContent>
);

export default function OutlinedCard({ title, guildLines, answer }) {
  return (
    <Box sx={{ minWidth: 275, p: 2, marginBottom: -2 }}>
      <Card variant="outlined" sx={{ borderRadius: 5, p: 3 }}>
        {getCard(title, guildLines, answer)}
      </Card>
    </Box>
  );
}
