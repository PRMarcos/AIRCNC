import React, { useState, useContext } from 'react';
import { AuthContext } from "../../context/authProvider"
import { Redirect } from "react-router-dom";

import { ValidateUser } from "../../utils/Validation"
import { Subscribe } from "../../services/authentication";

export default function SignIn({ history }) {

    const { currentUser } = useContext(AuthContext);
    const [erros, setErros] = useState({});
    const [isloading, setIsloading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState("");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');




    async function handleSubmit(event) {
        event.preventDefault();
        setIsloading(true);

        try {

            const ers = ValidateUser({ name, email, techs, password, confirmPassword });
            if (Object.keys(ers).length > 0) {
                setErros(ers);
                setIsloading(false);
            } else {

                await Subscribe({ name, email, techs, password, confirmPassword });

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
                Texto  <strong> chamativo </strong> para  te incentivar a  <strong> Cariar </strong> uma conta :)

                </p>

            <form onSubmit={handleSubmit} >
                <span style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>{erros.subscribe}</span>
                <label htmlFor="name">Nome * <span style={{ color: "red" }}>{erros.name}</span></label>
                <input
                    className={erros.name && "is-invalid"}
                    type="text"
                    placeholder="Seu nome"
                    id="name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                />


                <label htmlFor="email">Email * <span style={{ color: "red" }}>{erros.email}</span></label>
                <input
                    className={erros.email && "is-invalid"}
                    type="email"
                    placeholder="Seu email"
                    id="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

                <label htmlFor="techs">Techs *  {erros.techs ? (<span style={{ color: "red" }}>{erros.techs}</span>) : (<span>Separadas por Virgula</span>)} </label>
                <input
                    className={erros.techs && "is-invalid"}
                    type="text"
                    placeholder="Tecnologias de Interesse"
                    id="techs"
                    value={techs}
                    onChange={event => setTechs(event.target.value)}
                />


                <label htmlFor="password">Senha * <span style={{ color: "red" }}>{erros.password}</span></label>
                <input
                    className={erros.password && "is-invalid"}
                    type="password"
                    placeholder="Senha"
                    id="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />

                <label htmlFor="confirmPassword">Confirme a Senha * <span style={{ color: "red" }}>{erros.confirmPassword}</span></label>
                <input
                    className={erros.confirmPassword && "is-invalid"}
                    type="password"
                    placeholder="Confirme a senha"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={event => setConfirmPassword(event.target.value)}
                />


                <button className={isloading ? "disabled" : "btn"} type="submit" disabled={isloading}>{isloading ? "Aguarde..." : "Cadastrar"}</button>

            </form>
        </>
    );
}
