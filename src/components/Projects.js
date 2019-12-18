import React,{Fragment, useEffect, useState} from 'react'
import Project from './Project'
import { addProject, getProjects } from '../firebase/firebase.utils';

const Projects = props => {

    const [projects, setProjects] = useState([])

    useEffect(()=>{
        window.$('.modal').modal();
        fetchProjects(); 
    },[]);

    const fetchProjects = async () => {
        const res = await getProjects();
        await setProjects(res);
    }

    const [formData, setFormData] = useState({
        name: '',
        desc: '',
        github:'',
        website:''
    });

    let {name, desc, github, website } = formData

    const Submitter = async(e) =>{
        e.preventDefault()
        
        addProject(formData);

        setProjects([...projects, formData])
        setFormData({
            name: '',
            desc: '',
            github:'',
            website:''
        })
    }

    const Changer = e =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const { user } = props;

    return (
        <Fragment>
            <div className="row projects" id="projects">
                <h1 className="title">Projects</h1>
                {projects && projects.map((pro)=>(
                    <Project key={pro._id} project={pro}/>
                ))}
                <Fragment>
                    {user && <div className="col l3 m6 s12">
                        <div className="card-panel card">
                            <button data-target="modal1" className="btn modal-trigger"><i className="fa fa-plus"></i></button>
                        </div>
                    </div>}

                    <div id="modal1" className="modal">
                        <div className="modal-content">
                            <form onSubmit={e => Submitter(e)}>
                                <p>Add New Project</p>
                                <input type="text" placeholder="Name" name="name" value={name} onChange={e => Changer(e)} required/>
                                <textarea type="text" placeholder="Description" name="desc" value={desc} onChange={e => Changer(e)} required/>
                                <input type="text" placeholder="Github repo link" name="github" value={github} onChange={e => Changer(e)} required/>
                                <input type="url" placeholder="Website link if hosted" name="website" value={website} onChange={e => Changer(e)}/>
                                <input type="submit" value="Add" className="modal-close btn-flat"/>        
                            </form>
                        </div>
                    </div>
                </Fragment>
            </div>
        </Fragment>
    )
}


export default Projects