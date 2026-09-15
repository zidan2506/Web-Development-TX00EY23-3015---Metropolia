import {useEffect } from "react"
import { useState } from "react"



const UseEffectTest = () => {

    const [toggleOne, setToggleOne] = useState(false)
    const [toggleTwo, setToggleTwo] = useState(false)
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log("UseEffect1 Ran")
    }, [])

    useEffect(() => {
        console.log('UseEffect2 Ran', `toggleTwo state: ${toggleTwo}`);
        if (toggleTwo)
            console.log("toggleTwo slice of state is true so this code runs");
    }, [toggleTwo]) 

    useEffect(() => {
        const myInterval = setInterval(() => {
            console.log(`UseEffect3 with interval number ${count} is running`)
        }, 1000)

        return () => {
            console.log(
                `UseEffect3 cleanup ran. \nsetInterval number ${count} is being cleared out`
            );
            clearInterval(myInterval);
        }
    }, [count])





    return (
    <div>
        {console.log('rerenderd or rendered')}
        <h1>Use Effect Test Component</h1>
        <button onClick={()=> setToggleOne(!toggleOne)}>Button</button>
        <button onClick={() => setToggleTwo(!toggleTwo)}>toggleTwo</button>
        <button onClick={() => setCount(count+1)}>Count</button>

        
    </div>
    )
}


export default UseEffectTest;

