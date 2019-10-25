import { app } from "./firebase";
import { AddUser } from "./firestore"
const auth = app.auth();


async function Subscribe(user) {
    const { name, techs, email, password } = user;

    try {
        const Credential = await auth.createUserWithEmailAndPassword(email, password);
        await AddUser({ uid: Credential.user.uid, name: name, email: email, techs: techs });

        await Credential.user.updateProfile({
            displayName: name,
            photoURL: null
        });

        return Credential;
    } catch (error) {
        console.log(error.code, ": ", error.message);
        throw new Error("Something went wrong: " + error.code + " - " + error.message);

    }
}

async function LoginFirebase(email, password) {
    try {
        const Credential = await auth.signInWithEmailAndPassword(email, password);

        return Credential;
    } catch (error) {
        console.log(error.code, ": ", error.message);
        throw new Error("Something went wrong: " + error.code + " - " + error.message);
    }
}

async function LogOut() {
    try {
        await auth.signOut();
    } catch (error) {
        console.log(error.code, ": ", error.message);
        throw new Error("Something went wrong: " + error.code + " - " + error.message);
    }
}

export { LoginFirebase, LogOut, Subscribe };