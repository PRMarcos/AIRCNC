import React, { useContext } from 'react';
import { Redirect } from "react-router-dom"
import { AuthContext } from "../../context/authProvider"
import { Link } from "react-router-dom"

// import { Container } from './styles';

export default function Landing() {
    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return (<Redirect to="/dashboard"></Redirect>)
    }

    return (
        <>

            <p style={{ textAlign: "center" }}>Bem vindo faça <strong>login</strong> para começar a gerenciar seus <strong>spots!</strong></p>
            <Link to="/login">
                <button style={{ marginBottom: "20px" }} className="btn">Entrar</button>
            </Link>

            <span
                style={{ color: "#444" }}>
                Nao tem uma conta? clique <strong> <Link style={{ textDecoration: "none", color: "#444" }} to="/signin">aqui</Link> </strong> para se cadastrar!
            </span>
        </>
    );
}
