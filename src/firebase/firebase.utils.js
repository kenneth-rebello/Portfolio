import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyB2vAe-Crx7OymGo_i6NKdnf-e7kAqReP0",
    authDomain: "portfolio-kr7.firebaseapp.com",
    databaseURL: "https://portfolio-kr7.firebaseio.com",
    projectId: "portfolio-kr7",
    storageBucket: "portfolio-kr7.appspot.com",
    messagingSenderId: "437849217922",
    appId: "1:437849217922:web:59d74c11c4a52da4ec4d9b"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const firecloud = firebase.storage();

export const checkForUser = async ( userAuth ) => {

    if(userAuth){

        const userRef = firestore.doc(`users/${userAuth.uid}`);

        const snapShot = await userRef.get();
        if(!snapShot.exists){

            const { displayName, email, photoURL } = userAuth;
            const createdAt = new Date();

            try {
                await userRef.set({
                    displayName,
                    email,
                    createdAt,
                    photoURL
                })
            }catch(err){
                console.log('Error creating message'+err.message)
            }
        }
        return userRef;
    }
}

export const getBio = async() => {

    let fetchedBio = '';
    const docRef = await firestore.collection('details').doc('piM75SE1Ifnaa8YMW8D5');
    await docRef.get().then(doc => {
        if (doc.exists){
            fetchedBio = doc.data().bio;
        }else{
            return null
        }
    });
    return fetchedBio;
}

export const getPosition = async() => {

    let fetchedPosition = '';
    const docRef = await firestore.collection('details').doc('piM75SE1Ifnaa8YMW8D5');
    await docRef.get().then(doc => {
        if (doc.exists){
            fetchedPosition = doc.data().position;
        }else{
            return null
        }
    });
    return fetchedPosition;
}

export const sendMessage = ( msg, user ) => {

    firestore.collection("messages").add({
        message: msg,
        name: user.displayName,
        email: user.email
    }).then(function(docRef) {
        alert("Message sent");
    })
    .catch(function(error) {
        console.error("Error sending message");
    });

}

export const addProject = (project) => {
    firestore.collection("projects").add({...project})
    .then(function(docRef) {
        alert(`Project added with ID: ${docRef.id}`);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

export const getProjects = async () => {

    let fetchedProjects = [];
    const collectionRef = await firestore.collection('projects');

    await collectionRef.get().then(snapshot => {
        fetchedProjects = snapshot.docs.map(doc => {
            return doc.data()
        });
    });

    return fetchedProjects;
}

export const addSkill = (skill) => {
    firestore.collection("skills").add({...skill})
    .then(function(docRef) {
        alert(`Skill added with ID: ${docRef.id}`);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

export const getSkills = async () => {

    let fetchedSkills = [];
    const collectionRef = await firestore.collection('skills');

    await collectionRef.get().then(snapshot => {
        fetchedSkills = snapshot.docs.map(doc => {
            return doc.data()
        })
    });

    return fetchedSkills;
}

export const getDetails = async () => {

    let fetchedDetails = undefined;
    const docRef = await firestore.collection('details').doc('piM75SE1Ifnaa8YMW8D5');
    await docRef.get().then(doc => {
        if (doc.exists){
            const {email, location, phone} = doc.data();
            fetchedDetails = {
                'Email': email,
                'Location': location,
                'Phone': phone
            }
        }else{
            return null
        }
    });
    return fetchedDetails;

}


export const addUpload = (formData) => {

    const {title, file} = formData;
    
    firecloud.ref(`uploads/${title}`).put(file);

    firestore.collection("uploads").add({
        title
    });

}

export const getHonours = async() => {

    let fetchedTitles = [];
    const collectionRef = await firestore.collection('uploads');
    await collectionRef.get().then(snapshot => {
        fetchedTitles = snapshot.docs.map(doc => {
            return doc.data().title
        })
    });

    const storageRef = firecloud.ref();

    let fetchedHonours = [];
    let url = '';

    await fetchedTitles.map(async title => {

        url = await storageRef.child(`uploads/${title}`).getDownloadURL()
        fetchedHonours.push({
            title, url
        })

    });

    return(fetchedHonours)
}

//Google Sign In
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;