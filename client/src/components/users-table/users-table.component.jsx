import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(userName, numReservedSeats, isApproved) {
  return { userName, numReservedSeats, isApproved };
}

const rows = [
  createData('Frozen yoghurt', 159,true),
  createData('Ice cream sandwich', 237, false),
  createData('Eclair', 262, true),
  createData('Cupcake', 305, false),
  createData('Gingerbread', 356, false),
];

export default function UsersTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Username</StyledTableCell>
            <StyledTableCell align="right"># Reserved Seats</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.userName}>
              <StyledTableCell component="th" scope="row">
                {row.userName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.numReservedSeats}</StyledTableCell>
              <StyledTableCell align="right">{row.isApproved ? "Active" : <Button variant="contained" color="success">
        Approve
      </Button>}</StyledTableCell>
              <StyledTableCell align="right"> <IconButton><DeleteOutlineIcon /></IconButton></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}