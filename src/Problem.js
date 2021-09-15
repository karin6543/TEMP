import React from 'react'

function Problem(props) {
    
    let {title, difficulty, url} = props


    return (
        <div>
           
            <h3>Title: {title}</h3>
            <h4>difficulty: {difficulty}</h4>
            <a href={url}> link </a>
        </div>
    )
}

export default Problem
