import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';


function createData(team1,team2, date, fat, carbs, protein) {
    const match_title=team1+" vs "+team2
    return { match_title, date, fat, carbs, protein };
}

const rows = [
  createData('team1','team2', "This is a date"),
  createData('Ice cream','sandwich', "This is a date"),
  createData('Eclair','hello', "This is a date"),
  
];

export default function ReservationsTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Match</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.match_title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.match_title}
              </TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right"><IconButton><DeleteOutlineIcon /></IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}