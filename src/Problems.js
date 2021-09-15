import axios from 'axios'
import React, { Component, useRef, useState, useEffect } from 'react'
import Problem from './Problem'
import Cart from './Cart'

function Problems() {
    
    let [arr, setArr] = useState([])
    let [res, setRes] = useState([])
    let [selectId, setId] = useState()
    const idRef = useRef()

    const fetchData = async ()=>{
        await axios.get('https://us-east1-algo-tracker-dev.cloudfunctions.net/getProblems').then((r)=>{
            setRes(r.data)
     
        })
    }

    const onClickProb = (e) =>{
        setId(e.target.id)
    }
    

    useEffect(()=>{
        let {problems, difficulty, ids, urls, rates, types} = res
        // console.log(problems)
        if(problems){
            for(let i=0;i<problems.length;i++){
                arr.push({'id':ids[i],'title':problems[i],'difficulty': difficulty[i], 'url': urls[i], 'type': types[i], 'rate': rates[i]})
            }

            setArr(arr)
        }
       
    }, [res])

    return (
        <div>
            <Cart props={selectId}/>
            <button onClick={fetchData}>Load Problems</button>
           
            {arr.length>0? arr.map(p=> <div><Problem title={p.title} difficulty={p.difficulty} key={p.id} url={p.url} rate={p.rate} type={p.type}/><button onClick={onClickProb} id={p.id}>Select</button></div>):''}
   
           
        </div>
    )
}

export default Problems