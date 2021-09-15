import axios from 'axios'
import React, { Component, useRef, useState, useEffect } from 'react'
import Problem from './Problem'


function Problems() {
    let [problems, setProblems] = useState([])
    let [difficulty, setDiff] = useState([])
    let [id, setId] = useState([])
    let [url, setUrl] = useState([])
    let [arr, setArr] = useState([])

    const fetchData = async ()=>{
        await axios.get('https://us-east1-algo-tracker-dev.cloudfunctions.net/getProblems').then((res)=>{
            setProblems(res.data.problems)
            setDiff(res.data.difficulty)
            setUrl(res.data.urls)
            setId(res.data.ids)
        })
    }
    


    useEffect(()=>{
        
        if(problems){
            for(let i=0;i<problems.length;i++){
                arr.push({'id':id[i],'title':problems[i],'difficulty': difficulty[i], 'url': url[i]})
            }

            setArr(arr)
        }
       
    }, [difficulty])

    return (
        <div>
            <button onClick={fetchData}>submit</button>
            {arr.length>0? arr.map(p=><Problem title={p.title} difficulty={p.difficulty} key={p.id} url={p.url}/>):console.log(arr)}
           
        </div>
    )
}

export default Problems

