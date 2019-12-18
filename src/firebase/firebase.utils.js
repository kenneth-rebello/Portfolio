import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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

export const checkForKenneth = async ( userAuth ) => {

    if(userAuth){

        if(userAuth.email !== "kentherebel07@gmail.com" && userAuth.email !== "krebello07@gmail.com"){
            
            alert('Sorry, only Kenneth Rebello can sign in on this webpage');
            return null;

        }else{
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

}

export const createUserProfile = async ( userAuth ) => {

    if(userAuth){
        
    }
}

export const addProject = (project) => {
    firestore.collection("projects").add({...project})
    .then(function(docRef) {
        alert("Project added with ID: ", docRef.id);
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
        alert("Skill added with ID: ", docRef.id);
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


//Google Sign In
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;