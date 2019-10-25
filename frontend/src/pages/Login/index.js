import React, { useState, useContext } from 'react';
import { AuthContext } from "../../context/authProvider"
import { Link, Redirect } from "react-router-dom";

import { LoginFirebase } from "../../services/authentication";
import { validateSession } from "../../utils/Validation";

export default function Login({ history }) {
    const { currentUser } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erros, setErros] = useState({});
    const [isloading, setIsloading] = useState(false);


    async function handleSubmit(event) {
        event.preventDefault();
        setIsloading(true);


        try {

            if (Object.keys(validateSession(email, password)).length > 0) {
                setIsloading(false);
                setErros(validateSession(email, password));
            } else {
                await LoginFirebase(email, password);

            }

        } catch (error) {
            setIsloading(false);
            setErros({ generic: error.message });
        }


    }



    if (currentUser) {
        return (<Redirect to="/dashboard"></Redirect>)
    }
    return (
        <>
            <p>
                Ofereça <strong> spots </strong> para os programadores e encontre <strong> talentos </strong> para sua empresa

                </p>

            <form onSubmit={handleSubmit} >
                <span style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>{erros.generic}</span>
                <label htmlFor="email">Email * <span style={{ color: "red" }}>{erros.email}</span></label>
                <input
                    type="email"
                    placeholder="Seu email"
                    id="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />


                <label htmlFor="password">Senha * <span style={{ color: "red" }}>{erros.password}</span></label>
                <input
                    type="password"
                    placeholder="Senha"
                    id="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />

                <button className={isloading ? "disabled" : "btn"} disabled={isloading} type="submit">{isloading ? "Aguarde..." : "Entrar"}</button>

                <span style={{ margin: "20px auto", textAlign: "center", color: "#444" }}>
                    Nao tem uma conta? clique <strong> <Link style={{ textDecoration: "none", color: "#444" }} to="/signin">aqui</Link> </strong> para se cadastrar!
                </span>
            </form>
        </>
    );
}
