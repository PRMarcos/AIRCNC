import { app } from "./firebase";

const Db = app.firestore();
const storage = app.storage();


async function ListOwnerSpots(onwerId) {
  let dados = [];
  try {
    const snapshot = await Db.collection("Spots").get();
    snapshot.forEach(doc => {
      const obj = doc.data();

      if (obj.ownerId === onwerId) {
        dados.push({ _id: doc.id, ...obj });
      }
    });
    return dados;

  } catch (error) {
    throw new Error("Something went wrong: " + error.code + " - " + error.message);
  }
}


async function ListAllSpots() {
  let dados = [];
  try {
    const snapshot = await Db.collection("Spots").get();
    snapshot.forEach(doc => {
      const obj = doc.data();
      dados.push({ _id: doc.id, ...obj });
    });
    return dados;
  } catch (error) {
    throw new Error("Something went wrong: " + error.code + " - " + error.message);
  }
}

async function ListSpots(tech) {
  let dados = [];
  try {
    const snapshot = await Db.collection("Spots").get();
    snapshot.forEach(doc => {
      const obj = doc.data();
      const techsArray = obj.techs.split(",").map(tch => tch.trim());

      if (techsArray.includes(tech)) {
        dados.push({ _id: doc.id, ...obj });
      }

    });
    return dados;

  } catch (error) {
    throw new Error("Something went wrong: " + error.code + " - " + error.message);
  }
}

async function AddSpot(spot) {

  const { thumbnail } = spot;

  try {
    const docRef = await Db.collection("Spots").add({ ...spot, thumbnail: "" });

    const imgSnap = await storage.ref(`spots/${docRef.id}.png`).put(thumbnail);

    const ImgUrl = await imgSnap.ref.getDownloadURL();

    await docRef.update({ thumbnail: ImgUrl })
    return docRef;
  } catch (error) {

    throw new Error("Something went wrong: " + error.code + " - " + error.message);

  }
}

async function AddBooking(Booking) {

  const DefaultStatus = "pendding"

  try {

    const docRef = await Db.collection("Booking").add({ ...Booking, status: DefaultStatus, finished: false });

    return docRef;

  } catch (error) {

    throw new Error("Something went wrong: " + error.code + " - " + error.message);

  }
}


async function AddUser(User) {

  const { uid, name, email, techs } = User;


  try {

    const docRef = await Db.collection("Users").doc(uid).set({ name: name, email: email, techs: techs });

    return docRef;

  } catch (error) {

    throw new Error("Something went wrong: " + error.code + " - " + error.message);

  }
}



export { AddSpot, ListOwnerSpots, ListAllSpots, AddUser, ListSpots, AddBooking };
