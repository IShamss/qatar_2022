import React from "react";
import ReservationsTable from "../../components/reservations-table/reservations-table.component";
import "./my-reservations.styles.scss";

const MyReservationsPage = () => {
    return <div className="reservations-page-container">
        <h1 className="my-reservations-title">My Reservations</h1>
        <ReservationsTable />
    </div>

}

export default MyReservationsPage;