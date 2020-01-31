import React,{ Fragment, useEffect, useState } from 'react'
import Resume from    '../pdfs/KennethsResume.pdf'
import photo from '../img/dashphoto.jpg'
import Header from './Header'
import Projects from './Projects'
import Skills from './Skills'
import Honours from './Honours'
import {auth, checkForUser, getBio, getPosition, getDetails, sendMessage, signInWithGoogle } from '../firebase/firebase.utils';

import Spinner from './spinner/Spinner'
import Experiences from './Experiences'

const Main = () => {

    const [currentUser, setCurrentUser] = useState(undefined);
    const [visitor, setVisitor] = useState(undefined);
    const [bio, setBio] = useState('');
    const [position, setPosition] = useState('');
    const [details, setDetails] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const mapDetails = ['Email', 'Phone', 'Location'];

    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchBio();
        fetchDetails();
    });

    useEffect(() => {
        const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    
          if(userAuth){

            const userRef = await checkForUser(userAuth);

            if(userRef){
                if(userAuth.email === "kentherebel07@gmail.com" || userAuth.email === "krebello07@gmail.com"){
                    userRef.onSnapshot(async snapShot => {
                        await setCurrentUser({
                            id: snapShot.id,
                            ...snapShot.data()
                        })
                    })
                }else{
                    userRef.onSnapshot(async snapShot => {
                        await setVisitor({
                            id: snapShot.id,
                            ...snapShot.data()
                        })
                    })
                }
            }else{
                await setCurrentUser(undefined);
            }
          }else{
            await setCurrentUser(undefined);
          }
        })    
    
        return () => {
          unsubscribeFromAuth();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchBio = async() => {
        const res = await getBio();
        setBio(res)
        const res2 = await getPosition();
        setPosition(res2)
    }

    const fetchDetails = async() => {
        const res = await getDetails();
        setDetails(res)
        setLoading(false);
    }

    const Changer = e => {
        setMessage(e.target.value)
    }

    const Submitter = async e => {
        await signInWithGoogle();
        if(visitor && message){
            sendMessage(message, visitor);
        }
    } 

    return (
        loading ? <Spinner/> :<Fragment>    
            <Header user={currentUser}/>

            <div className="header row">
                <div className="col l3 m6 s12 center-align"><img src={photo} alt=""/></div>
                <div className="col l9 m6 s12">
                    <span>Kenneth Rebello</span>
                    {position.split('-').map(line=>(
                        <p key={line}>{line}</p>
                    ))}
                    <hr></hr>
                    {bio.split('-').map(line=>(
                        <p key={line}>{line}</p>
                    ))}
                    <div className="social">
                        <a href={Resume} className="cv" target="_blank" rel="noopener noreferrer">CV</a>
                        <a href="https://github.com/kenneth-rebello"><i className="fab fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/kenneth-rebello-515043182/"><i className="fab fa-linkedin"></i></a>
                        <a href="https://www.instagram.com/kenrebel07/"><i className="fab fa-instagram"></i></a>
                        <a href="https://www.facebook.com/kenneth.rebello.3?ref=bookmarks"><i className="fab fa-facebook"></i></a>
                        <a href="https://twitter.com/KenRebel07"><i className="fab fa-twitter"></i></a>
                    </div>
                </div>
                <div className="col l11 m10 s9">
                    <input type="text" name="message" 
                        className="message"
                        placeholder="Leave a message" onChange={e => Changer(e)}/>
                </div>
                <div className="col l1 m2 s3">
                    <button className=" btn msg-btn" onClick={e => Submitter(e)}>Send</button>
                </div>
            </div>

            <Experiences/>
            <Projects user={currentUser}/>
            <Skills user={currentUser}/>
            <Honours user={currentUser}/>

            <div className="details" id="details">
                
                <div className="row">
                    { details && mapDetails.map(detail => (
                        <div key={detail} className="col l4 m6 s12">
                            <p className="center-align">{`${detail}: ${details[detail]}`}</p>        
                        </div>   
                    ))}
                    <span className="col l12 m12 s12  center-align ">This website was created using React and Firebase for learning purposes</span>
                    <small className="col l12 m12 s12 white-text center-align ">Copyright <i className="far fa-copyright"></i> Kenneth 2019</small>
                </div>
                
            </div>
        </Fragment>
    )
}


export default Main