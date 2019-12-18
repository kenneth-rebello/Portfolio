import React, { Fragment, useState, useEffect } from 'react'
import { addUpload, getHonours } from '../firebase/firebase.utils';

const Honours = props => {

    const [formData, setFormData] = useState({
        title:'',
        file: null
    });
    const { title } = formData;

    const [honours, setHonours] = useState(undefined);

    useEffect(() => {
        fetchHonours();
    },[])

    const fetchHonours = async() => {
        const res = await getHonours();
        setHonours(res);
    }

    const Submitter = async(e) =>{
        e.preventDefault();
        
        addUpload(formData);

        setFormData({
            title:'',
            file: null
        });
    }

    const Changer = e =>{
        setFormData({...formData, title: e.target.value})
    }

    const fileHandler = e => {
        setFormData({...formData, file: e.target.files[0]})
    }

    const { user } = props;

    return (
        <div className="row projects">
            <h1 className="title">Courses and Competitions</h1>
            {honours && honours.map(each => (
                <div className="col l3 m6 s12">
                    <div class="card cert-card">
                        <div class="card-content">
                            <span className="card-title activator">{each.title}</span>
                        </div>
                        <div class="card-reveal cert">
                            <div className="card-image">
                                <img src={each.url} alt="" />
                            </div>                    
                            <span className="card-title">
                                <i className="fa fa-close right"></i>
                            </span>
                        </div>
                    </div>
                </div>
            ))}
            
            <Fragment>
                {user && <div className="col l3 m6 s12">
                    <div className="card-panel card">
                        <button data-target="modal3" className="btn modal-trigger"><i className="fa fa-plus"></i></button>
                    </div>
                </div>}

                <div id="modal3" className="modal">
                    <div className="modal-content">
                        <form onSubmit={e => Submitter(e)}>
                            <p>Add New Project</p>
                            <input type="text" placeholder="Title" name="title" value={title} onChange={e => Changer(e)} required/>
                            <input type="file" name="file" onChange={e => fileHandler(e)}/>
                            <input type="submit" value="Add" className="modal-close btn-flat"/>        
                        </form>
                    </div>
                </div>
            </Fragment>
        </div>
    )
}


export default Honours
