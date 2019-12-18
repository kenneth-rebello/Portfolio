import React ,{ Fragment, useEffect } from 'react';
import SignIn from './SignIn';
import logo from '../img/kr.jpeg'; 

const Header = (props) => {

    useEffect(()=>{
        window.$('.sidenav').sidenav();
    },[])

    return (
        <Fragment>
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
                    <img src={logo} alt=""/>
                    <ul className="right hide-on-med-and-down">
                        <li><a href="#">Overview</a></li>
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#skills">Skills</a></li>
                        <li><a href="#details">Contact</a></li>
                        <SignIn user={props.user}/>
                    </ul>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="fas fa-bars"></i></a>
                    </div>
                </nav>
            </div>
            <ul className="sidenav" id="mobile-demo">
                <li><a href="#">Overview</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#details">Contact</a></li>
                <SignIn user={props.user}/>
            </ul>
        </Fragment>
    )
}


export default Header
