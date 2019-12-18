import React,{Fragment} from 'react'
import PropTypes from 'prop-types'

const Skill = ({skill}) => {

    return (
        <Fragment>
            <div className="col l3 m6 s12">
                {skill && 
                <div className="card skill-card">
                    {skill.photo && <div class="card-image">
                        <img src={skill.photo} alt=""/>
                    </div>}
                    <div class="card-content">
                        <p>{skill.name}</p>
                    </div>
                </div>}
            </div>
        </Fragment>
    )
}

Skill.propTypes = {
    skill: PropTypes.object,
}

export default Skill
