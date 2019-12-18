import React from 'react'
import cert1 from '../img/Transmission.png'
import course1 from '../img/MERN.png'

const Honours = props => {
    return (
        <div className="row projects">
            <h1 className="title">Courses and Competitions</h1>
            <div className="col l3 m6 s12">
                <div class="card cert-card">
                    <div class="card-content">
                        <span className="card-title activator">Coding Marathon</span>
                    </div>
                    <div class="card-reveal cert">
                        <div className="card-image">
                            <img src={cert1} alt="" />
                        </div>                    
                        <span className="card-title">
                            <i className="fa fa-close right"></i>
                        </span>
                    </div>
                </div>
            </div>

            <div className="col l3 m6 s12">
                <div class="card cert-card">
                    <div class="card-content">
                        <span className="card-title activator">Udemy - MERN stack</span>
                    </div>
                    <div class="card-reveal cert">
                        <div className="card-image">
                            <img src={course1} alt="" />
                        </div>    
                        <span className="card-title">
                            <i className="fa fa-close right"></i>
                        </span>                
                    </div>
                </div>
            </div>
                
        </div>
    )
}


export default Honours
