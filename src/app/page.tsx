"use client"

import { useEffect, useRef, useState } from 'react'
import styles from './main.module.css'

async function fetchData(){
  try{
    const response =  await fetch('https://randomuser.me/api/');
    const data = await response.json();
    console.log(data)
    return data?.results
  }
  catch(e){
    console.log(e); 
    //throw new Error({statusCode:500, title:'error', withDarkMode:false })
  }
    
}





export default function Page(){

    const [profiles, setProfiles] = useState<any[]>([]);
    const initialized = useRef(false);


    const getProfiles = async () =>{
      const result = await fetchData();
      setProfiles(result)

  }


    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            getProfiles();
        }
        const intervalId = setInterval(getProfiles, 5000)
          return () => {
            clearInterval(intervalId)
          }

    }, [profiles])

  return <>
    {
        profiles ? profiles.map((item, index) =>{
          return  <div className={styles.wrapper} key={index}>
                <div>
                    <img  src={item?.picture?.large}></img>
                    <div>
                        <div>
                            <p>First Name:</p> <span>{item?.name?.first}</span>
                        </div>
                        <div>
                            <p>Last Name:</p> <span>{item?.name?.last}</span>
                        </div>
                        <div>
                            <p>Age: </p> <span>{item?.dob?.age}</span>
                        </div>
                        <div>
                            <p>Email:</p> <span>{item?.email}</span>
                        </div>
                        <div>
                            <p>Phone Number:</p> <span>{item?.phone}</span>
                        </div>
                        <div>
                            <p>Gender:</p> <span>{item?.gender}</span>
                        </div>
                    </div>
                    <div>
                       <button>prev</button>
                       <button>next</button>
                    </div>
                </div>
            </div>
        }) : <p style={{fontSize: '40px'}}> An Error Occured</p>
    } 
  </>
};



 
