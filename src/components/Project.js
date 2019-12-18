import React,{Fragment} from 'react'
import PropTypes from 'prop-types'

const Project = ({project}) => {

    return (
        <Fragment>
            <div className="col l3 m6 s12">
                {project && 
                    <div className="card project-card">
                        <div className="card-content">
                        <span className="card-title activator">{project.name}</span>
                        {project.github && <p><a href={`${project.github}`} target="_blank" rel="noopener noreferrer">Link to Github repository</a></p>}
                        </div>
                        <div className="card-reveal">
                        <span className="card-title">{project.name}<i className="fa fa-close" style={{float:'right'}}></i></span>
                        <p>{project.desc}</p>
                        </div>
                  </div>}
            </div>
        </Fragment>
    )
}

Project.propTypes = {
    project: PropTypes.object,
}

export default Project
