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
import instance from '../axios';
import { useEffect } from 'react';
import Swal from "sweetalert2"

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
  const [users,setUsers]=React.useState([])
    useEffect(()=>{
    instance.get("/users/"
		).then((response) => {
setUsers(response.data.users)		
		
		  }).catch((err)=>{
			Swal.fire({
				title: 'Error!',
				text: err.response.data.message,
				icon: 'error',
				confirmButtonText: 'Ok'
			  })  });
	}
  ,[])
  function getType(role){
    switch(role)   {
        case 1:
            return "customer";
        case 2:
            return "manager";
        case 3:
            return "site admin";
        default:
            break;
    } 
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Username</StyledTableCell>
            <StyledTableCell align="center"># Reserved Seats</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <StyledTableRow key={user.user_name}>
                <StyledTableCell component="th" scope="row">
                    {user.user_name}
                </StyledTableCell>
                <StyledTableCell align="center">{user.numReservedSeats}</StyledTableCell>
                <StyledTableCell align="center">{!user.to_be_a_manager ? getType(user.role) :
                <React.Fragment> 
                    <Button variant="contained" color="success"   
                    onClick={() => {
                        instance.patch(`/user/approve/${user._id}`,
                       
                        ).then((response) => {
                            Swal.fire({
                                title: 'Success!',
                                text: "approved successfully :D",
                                icon: 'success',
                                confirmButtonText: 'Ok'
                              });
                                setUsers(response.data.users)
                            }).catch((err)=>{
                            Swal.fire({
                                title: 'Error!',
                                text: err.response.data.message,
                                icon: 'error',
                                confirmButtonText: 'Ok'
                              })} ) }}
                
                    >
                        Approve
                    </Button>
                    <Button variant="contained" color="error" style={{"marginLeft":"10px"}}
                     onClick={() => {
                        instance.patch(`/user/disapprove/${user._id}`,
                       
                        ).then((response) => {
                            Swal.fire({
                                title: 'Success!',
                                text: "disapproved successfully :D",
                                icon: 'success',
                                confirmButtonText: 'Ok'
                              });
                                setUsers(response.data.users)
                            }).catch((err)=>{
                            Swal.fire({
                                title: 'Error!',
                                text: err.response.data.message,
                                icon: 'error',
                                confirmButtonText: 'Ok'
                              })} ) }}>
                        Disapprove
                    </Button> 
                </React.Fragment>}
            </StyledTableCell>
              <StyledTableCell align="center"> <IconButton onClick={() => {
                        instance.delete(`/user/${user._id}`,
                       
                        ).then((response) => {
                            Swal.fire({
                                title: 'Success!',
                                text: "deleted successfully :D",
                                icon: 'success',
                                confirmButtonText: 'Ok'
                              });
                                setUsers(response.data.users)
                            }).catch((err)=>{
                            Swal.fire({
                                title: 'Error!',
                                text: err.response.data.message,
                                icon: 'error',
                                confirmButtonText: 'Ok'
                              })} ) }}><DeleteOutlineIcon  /></IconButton></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}