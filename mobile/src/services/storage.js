import { app } from "./firebase";

const storage = app.storage();

async function AddSpotImg(spot) {
    try {

        const imgSnap = await storage.ref(`spots/${spot.company}.png`).put(spot);
        return imgSnap.ref.getDownloadURL();

    } catch (error) {
        console.log(error)
    }
}



export { AddSpotImg };
