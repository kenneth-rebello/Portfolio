import React,{Fragment, useEffect, useState} from 'react'
import Skill from './Skill'
import { addSkill, getSkills } from '../firebase/firebase.utils';

const Skills = props => {

    useEffect(()=>{
        window.$('.modal').modal()
        fetchSkills();
    },[]);

    const fetchSkills = async() => {
        const res = await getSkills();
        await setSkills(res);
    }

    const [skills, setSkills] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        photo:''
    });

    let {name, photo } = formData

    const Submitter = async(e) =>{
        e.preventDefault()
     
        await addSkill(formData);

        setSkills([...skills, formData])

        setFormData({
            name: '',
            photo:'',
            password:''
        })
    }

    const Changer = e =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const { user } = props;

    return (
        <Fragment>
            <div className="row projects">
                <h1 className="title" id="skills">Skills</h1>
                {skills.length>0 && skills.map((pro)=>(
                    <Skill key={pro._id} skill={pro}/>
                ))}
                <Fragment>
                    {user && <div className="col l3 m6 s12">
                        <div className="card-panel card">
                            <button data-target="modal2" className="btn modal-trigger"><i className="fa fa-plus"></i></button>
                        </div>
                    </div>}

                    <div id="modal2" className="modal">
                        <div className="modal-content">
                            <form onSubmit={e => Submitter(e)}>
                                <p>Add New Skill</p>
                                <input type="text" placeholder="Name" name="name" value={name} onChange={e => Changer(e)} required/>
                                <input type="text" placeholder="Enter a link to a photo for respresentation" name="photo" value={photo} onChange={e => Changer(e)} required/>
                                <span>The link must be the url of a photo from the internet and not a file path on your machine</span>
                                <input type="submit" className="modal-close btn-flat"/>        
                            </form>
                        </div>
                    </div>
                </Fragment>
            </div>
        </Fragment>
    )
}


export default Skills