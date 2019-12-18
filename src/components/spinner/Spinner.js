import React from 'react'
import loader from '../../img/loader.gif'

export default function Spinner() {
    return (
        <div>
            <img style={{
                height:'100vh',
                width: '80%',
                alignSelf: 'center',
                justifySelf:'center',
                paddingLeft: '5rem'
            }} src={loader}/>
        </div>
    )
}
