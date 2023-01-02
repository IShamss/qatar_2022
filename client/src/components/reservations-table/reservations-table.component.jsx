import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import instance from "../../components/axios";
import { useEffect } from "react";
import { loadUser } from "../../assets/utils";
import Swal from "sweetalert2";
// const rows = [
//   createData('team1','team2', "This is a date"),
//   createData('Ice cream','sandwich', "This is a date"),
//   createData('Eclair','hello', "This is a date"),

// ];

export default function ReservationsTable() {
    const currentUser = loadUser();
    const [teams, setTeams] = React.useState([]);
    const [teams_M, setTeams_M] = React.useState([]);
    const [values, setValues] = React.useState([]);
    const [reservations, setReservations] = React.useState([]);
    const [matches, setMatches] = React.useState([]);
    const [matches_M, setMatches_M] = React.useState([]);

    //   useEffect(()=>{
    //   instance.get("/reservations/"+currentUser._id).then(res=>{
    //     console.log("These are reservations",res.data.reservaions)
    //     setReservations(res.data.reservaions)
    //     let obj = {};
    //     instance.get("/teams/"
    // 		).then((response) => {
    // 			setTeams(response.data.teams)
    //             for (let i = 0; i < response.data.teams.length; i++) {
    //               obj[response.data.teams[i]._id] = response.data.teams[i].name;
    //             }
    //             setTeams_M(obj);
    // 		  }).catch((err)=>{
    // 		console.log(err)
    //         });
    //     rows=[];
    //     res.data.reservaions.forEach(reservation=>{
    //       instance.get("/match/"+reservation.match).then(res=>{
    //         console.log("These are matches",res.data.match)
    //         // console.log("obj thing"+obj[res.data.match.team1])
    //         if(obj[res.data.match.team1]){
    //           rows.push(createData(reservation._id , obj[res.data.match.team1],obj[res.data.match.team2],res.data.match.date))
    //         }
    //       }).catch(err=>{console.log(err)})
    //     })
    //     setValues(rows);
    //     console.log("values here",values)
    //   }).catch(err=>{
    //     console.log(err)
    //   })
    //   return()=>(setValues([]))

    // },[]);

    useEffect(() => {
        instance
            .get("/reservations/" + currentUser._id)
            .then((res) => {
                setReservations(res.data.reservaions);
            })
            .catch((err) => {
                console.log(err);
            });
        instance
            .get("/matches/")
            .then((response) => {
                setMatches(response.data.matches);
                let obj = {};
                for (let i = 0; i < response.data.matches.length; i++) {
                    obj[response.data.matches[i]._id] =
                        response.data.matches[i].name;
                }
                setMatches_M(obj);
            })
            .catch((err) => {
                console.log(err);
            });

        //   }).catch((err)=>{
        // console.log(err)
        //     });
        instance
            .get("/teams/")
            .then((response) => {
                setTeams(response.data.teams);
                let obj = {};
                for (let i = 0; i < response.data.teams.length; i++) {
                    obj[response.data.teams[i]._id] =
                        response.data.teams[i].name;
                }
                setTeams_M(obj);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleDelete = (resId) => {
        // console.log(resId)
        // console.log(e);
        instance
            .delete("/reservation/" + resId)
            .then((res) => {
                Swal.fire({
                    title: "Success!",
                    text: "deleted successfully :D",
                    icon: "success",
                    confirmButtonText: "Ok",
                });
                setReservations(res.data.reservations);
                console.log("deleted");
            })
            .catch((err) => {
                Swal.fire({
                    title: "Error!",
                    text: err.response.data.message,
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            });
    };

    return (
        <TableContainer component={Paper}>
            <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Match</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reservations.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {`${
                                    matches.find((x) => x._id == row.match)
                                        ? teams_M[
                                              matches.find(
                                                  (x) => x._id == row.match
                                              ).team1
                                          ]
                                        : ""
                                } vs ${
                                    matches.find((x) => x._id == row.match)
                                        ? teams_M[
                                              matches.find(
                                                  (x) => x._id == row.match
                                              ).team2
                                          ]
                                        : ""
                                }`}
                            </TableCell>
                            <TableCell align="right">{`${
                                matches.find((x) => x._id == row.match)
                                    ? matches.find((x) => x._id == row.match)
                                          .date
                                    : ""
                            } `}</TableCell>
                            <TableCell align="right">
                                <IconButton
                                    onClick={() => handleDelete(row._id)}
                                >
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
