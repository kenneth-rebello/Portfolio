import React,{Fragment} from 'react'

const Experiences = props => {

    return (
        <Fragment>
            <div className="row projects" id="projects">
                <h1 className="title">Experience</h1>
                <div className="col s12 m6 l3">
                    <div className="card project-card">
                        <div className="card-content">
                            <span className="card-title">React Developer</span>
                            <p>Internship (Dec'19 - Jan'20)</p>
                            <p className="card-subtitle">Parts of <a href="https://indiadatahub.com/" target="_blank">
                                India Data Hub Website
                            </a> for SixtyFour DI</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Experiences;