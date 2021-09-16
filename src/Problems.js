import axios from 'axios'
import React, { Component, useRef, useState, useEffect } from 'react'
import Problem from './Problem'
import UserSchedule from './UserSchedule'

function Problems() {
    
    let [arr, setArr] = useState([])
    let [filteredArr, setFilterArr] = useState([])
    let [res, setRes] = useState([])
    let [selectId, setId] = useState()
    const idRef = useRef()
    const searchRef = useRef()
    

    const fetchData = async ()=>{
        await axios.get('https://us-east1-algo-tracker-dev.cloudfunctions.net/getProblems').then((r)=>{
            setRes(r.data)
     
        })
    }

    const onClickProb = (e) =>{
        setId({'id':e.target.id, 
        'title':e.target.title})
    }
    

    useEffect(()=>{
        let {problems, difficulty, ids, urls, rates, types} = res
        // console.log(problems)
        if(problems){
            for(let i=0;i<problems.length;i++){
                arr.push({'id':ids[i],'title':problems[i],'difficulty': difficulty[i], 'url': urls[i], 'type': types[i], 'rate': rates[i]})
            }

            setArr(arr)
            setFilterArr(arr)
        }
       
    }, [res])

    function handleChange(e){

        let searchTerm = searchRef.current.value
        console.log('current search term-》', searchTerm)
        if(searchTerm !==''){
            console.log('valid term', searchTerm)
            setFilterArr(filterByKeyword(arr, searchTerm))
        }
        else{
            console.log('empty term', searchTerm)
            setFilterArr(arr)
        }

    }

    function filterByKeyword(a, keyword){
        return a.filter((ele)=>{return ele.title.toLowerCase().indexOf(keyword.toLowerCase())!==-1})
    }

    console.log('see the filter arr:', filteredArr)
    return (
        <div>
            
            <form>
           <div onChange={handleChange}>
               <label>Search</label>
               <input ref={searchRef}></input>
           </div>
          
          
             <button type="submit">
               Create</button>
             </form>
            <UserSchedule props={selectId}/>
            <button onClick={fetchData}>Load Problems</button>
           
            {filteredArr.length>0? filteredArr.map(p=> <div ><Problem title={p.title} difficulty={p.difficulty} key={p.id} url={p.url} rate={p.rate} type={p.type}/><button onClick={onClickProb} id={p.id} title={p.title}>Select</button></div>):''}
   
           
        </div>
    )
}

export default Problems