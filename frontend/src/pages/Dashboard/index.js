import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../../context/authProvider"
import { ListOwnerSpots } from "../../services/firestore";
import { app } from "../../services/firebase";

import { Loading } from "../../components/Loading"


import { Link } from "react-router-dom"
import "./styles.css";

const Db = app.firestore();


export default function Dashboard() {
    const { currentUser } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [spots, setSpots] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        async function loadSpots() {
            const spotsgot = await ListOwnerSpots(currentUser.uid);
            setSpots(spotsgot);
        }

        loadSpots();
    }, [currentUser]);

    useEffect(() => {

        const DbListening = Db.collection("Booking").where("companyId", "==", currentUser.uid).where("status", "==", "pendding")
            .onSnapshot(function (querySnapshot) {
                var requests = [];
                querySnapshot.forEach(function (doc) {

                    const obj = doc.data();
                    requests.push({ _id: doc.id, ...obj });
                });
                setRequests(requests);

            });
        return () => {
            DbListening();
        }
    }, [currentUser]);




    const handleAccept = (schedlueId) => {

        try {
            Db.collection("Booking").doc(schedlueId).update({ status: "acept" })
        } catch (error) {
            setErrors({ generic: error.message });
        }


    }
    const handleReject = (schedlueId) => {
        try {
            Db.collection("Booking").doc(schedlueId).update({ status: "reject" })
        } catch (error) {
            setErrors({ generic: error.message });
        }

    }

    if (spots === null) {
        return <Loading />;
    }

    return (

        <>
            <span style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>{errors.generic}</span>
            <ul className={`notifications ${requests.length === 0 && "hide-line"}`}  >
                {
                    requests.map(request => (
                        <li key={request._id}>
                            <p>
                                <strong>{request.userName}</strong> está solicitando uma reseva em <strong>{request.spotName}</strong> para a data:<strong>{request.date}</strong>
                            </p>
                            <button className="accept" onClick={() => { handleAccept(request._id) }} >ACEITAR</button>
                            <button className="reject" onClick={() => { handleReject(request._id) }} >REJEITAR</button>
                        </li>
                    ))
                }

            </ul>
            <ul className="spot-list">
                {
                    spots.map(spot => (
                        <li key={spot._id}>
                            <header style={{ backgroundImage: `url(${spot.thumbnail})` }} />
                            <strong>{spot.company}</strong>
                            <span>{spot.price ? (`R$ ${spot.price}/dia`) : ("GRÁTIS")}</span>
                        </li>
                    ))
                }

            </ul>
            <Link to="/newSpot">
                <button className="btn">Cadastrar novo Spot</button>
            </Link>
        </>
    );
}
