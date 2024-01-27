"use client"

import { useEffect, useRef, useState } from 'react'
import styles from './main.module.css'

async function fetchData(){
    const response =  await fetch('https://randomuser.me/api/');
    const data = await response.json();
    console.log(data?.results);
    return data?.results
   

}

export interface pageProps {
    profile: any
}
export default function page({}:pageProps){

    const [profiles, setProfiles] = useState<any[]>([]);
    const initialized = useRef(false);


    useEffect(() => {
        //setInterval(getProfile, 300000000000);
        console.log()
        if (!initialized.current) {
            initialized.current = true
        
        console.log('fire once?')
        getProfile();
        }
        const intervalId = setInterval(getProfile, 5000)
          return () => {
            clearInterval(intervalId)
          }

       

        // getProfile();
    }, [profiles])


   const  getProfile = async () =>{
        console.log('get a job');
        const result = await fetchData();
        setProfiles(result)

    }


    


  return <>
    {
        profiles.map((item, index) =>{
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
                </div>
            </div>
        })
    }
  </>
};



 
