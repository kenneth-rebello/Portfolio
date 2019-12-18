import React,{ Fragment, useEffect, useState } from 'react'
import Resume from    '../pdfs/KennethsResume.pdf'
import photo from '../img/dashphoto.jpg'
import Navbar from './Navbar'
import Projects from './Projects'
import Skills from './Skills'
import Honours from './Honours'
import {auth, checkForKenneth } from '../firebase/firebase.utils';

const Main = () => {

    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    
          if(userAuth){
            
            const userRef = await checkForKenneth(userAuth);
            
            if(userRef){
                userRef.onSnapshot(async snapShot => {
                    await setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    })
                })
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
    }, [])


    return (
        <Fragment>    
            <Navbar user={currentUser}/>
            <div className="header row">
                <div className="col l3 m6 s12 center-align"><img src={photo} alt=""/></div>
                <div className="col l9 m6 s12">
                    <span>Kenneth Rebello</span>
                    <p>Student at Fr. Conceicao Rodrigues College Of Engineering, Bandra</p>
                    <p>Third Year, Information Technology</p>
                    <hr></hr>
                    <p>I am currently exploring the field of Web Development, focusing on the MERN stack and related technologies, and also have a keen interest in pursuing Web Security, a subject that I find most intriguing.</p>
                    <p>I am not one for textbook knowledge and instead prefer to rely on learning by using my hands and my head, through trial and error. I am known to value my work and my time. When it comes to coding, I am passionate, relentless and absolutely love working with a keyboard at my fingertips.</p>
                    <p>I will NOT rest until I've fixed that error! - Famous last words of many coders, but not me.</p>
                    <p>Other than coding, I also enjoy reading, fiction mostly, and plan on writing something someday too! I also enjoy football and use it as a regular escape from coding.</p>
                    <p>Have a look at my github to know more about what I do all day!</p>
                    <div className="social">
                        <a href={Resume} className="cv" target="_blank" rel="noopener noreferrer">CV</a>
                        <a href="https://github.com/kenneth-rebello"><i className="fab fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/kenneth-rebello-515043182/"><i className="fab fa-linkedin"></i></a>
                        <a href="https://www.instagram.com/kenrebel07/"><i className="fab fa-instagram"></i></a>
                        <a href="https://www.facebook.com/kenneth.rebello.3?ref=bookmarks"><i className="fab fa-facebook"></i></a>
                        <a href="https://twitter.com/KenRebel07"><i className="fab fa-twitter"></i></a>
                    </div>
                </div>
            </div>
            <Projects user={currentUser}/>
            <Skills user={currentUser}/>
            <Honours user={currentUser}/>
            <div className="details" id="details">
                
                <div className="row">
                    <div className="col l4 m6 s12">
                        <p className="center-align">Location: Mumbai, India</p>        
                    </div>   
                    <div className="col l4 m6 s12">
                        <p className="center-align">Contact No: 7021720320</p>        
                    </div>
                    <div className="col l4 m6 s12">
                        <p className="center-align">Email ID: krebello07@gmail.com</p>        
                    </div>
                    <span className="col l12 m12 s12  center-align ">This website was created using React and Firebase for learning purposes</span>
                    <small className="col l12 m12 s12 white-text center-align ">Copyright <i className="far fa-copyright"></i> Kenneth 2019</small>
                </div>
                
            </div>
        </Fragment>
    )
}


export default Main