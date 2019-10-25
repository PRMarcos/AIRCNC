import React, { useState, useMemo, useContext } from 'react';

import { AuthContext } from "../../context/authProvider"
import CameraImg from "../../assets/camera.svg";
import { isEmpty } from "../../utils/Validation"

import { AddSpot } from "../../services/firestore"


import "./styles.css";

export default function NewSpot({ history }) {
    const { currentUser } = useContext(AuthContext);

    const [company, setCompany] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [price, setPrice] = useState('');
    const [techs, setTechs] = useState("");
    const [errors, setErrors] = useState({});
    const [isloading, setIsloading] = useState(false);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    }, [thumbnail])

    function CheckData() {

        let err = {};

        if (isEmpty(company))
            err.company = "Must not be empty";


        if (isEmpty(techs))
            err.techs = "Must not be empty";


        if (thumbnail !== null) {
            if (thumbnail.type !== "image/png" && thumbnail.type !== "image/jpeg")
                err.image = "file type not suported";
        } else {
            err.image = "Please, chose an image"
        }
        return err;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsloading(true);

        try {

            if (Object.keys(CheckData()).length > 0) {

                setErrors(CheckData());
                setIsloading(false);

            } else {

                await AddSpot({ ownerId: currentUser.uid, company, price, techs, thumbnail });

                history.push("/dashboard");
            }

        } catch (error) {
            setIsloading(false);
            setErrors({ generic: error.message });
        }

    }
    return (
        <>

            <form onSubmit={handleSubmit} >
                <label className={thumbnail ? "has-thumbnail" : ""} id="thumbnail" style={{ backgroundImage: `url(${preview})` }}>
                    <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                    <img src={CameraImg} alt="camera img" />
                </label>
                <span style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>{errors.image}</span>




                <label htmlFor="company">Empresa * <span style={{ color: "red" }}>{errors.company}</span></label>
                <input
                    type="company"
                    placeholder="Empresa"
                    id="company"
                    value={company}
                    onChange={event => setCompany(event.target.value)}
                />

                <label htmlFor="price">Preço * <span>em branco para gratuito</span> </label>
                <input
                    type="price"
                    placeholder="Preço"
                    id="price"
                    value={price}
                    onChange={event => setPrice(event.target.value)}
                />
                <label htmlFor="techs">Tecnologias * <span>{!errors.techs && "Separadas por vírgula"}</span> <span style={{ color: "red" }}>{errors.techs}</span></label>
                <input
                    type="techs"
                    placeholder="React, Node.js, etc..."
                    id="techs"
                    value={techs}
                    onChange={event => setTechs(event.target.value)}
                />

                <button className={isloading ? "disabled" : "btn"} type="submit" disabled={isloading}>{isloading ? "Aguarde..." : "Cadastrar"}</button>
                <button style={{ marginTop: "10px" }} className={isloading ? "hide" : "btn"} type="button" disabled={isloading} onClick={() => { history.push("/dashboard") }}>Voltar</button>
                <span style={{ color: "red", textAlign: "center", marginTop: "10px" }}>{errors.generic}</span>
            </form>
        </>
    );


}
