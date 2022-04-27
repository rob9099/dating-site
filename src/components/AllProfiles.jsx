import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../css/AllProfiles.css'



const AllProfiles = () => {


    useEffect(() => {
        fetchAllProfiles();
    }, [])
  
  const [profiles, setProfiles] = useState([]);

  
  const fetchAllProfiles = async () => {
    try {
        const res = await axios.get("http://localhost:5000/get")
        setProfiles(res.data)
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}

  
    return (
    <div>
        <section className='profilesContainer'>
        {profiles.map((profile) => {
            
            profile.profileImage.map((profileImage, index) => {
                profileImage = profileImage.slice(5)
                profileImage = profileImage.replace(/\\/g, "/")
                profile.profileImage[index] = profileImage
                
            })
            return(
                <article key={profile._id} className='profileCard'>
                    <img src={profile.profileImage[0]} alt="" height="400px"/>
                    <h4>{profile.firstName}, {profile.age}</h4>
                    <h4>Kön: {profile.gender}</h4>
                    <h4>Stad: {profile.city}</h4>
                    <h4>Yrke: {profile.employment}</h4>
                    <span>{profile.profileBio}
                        <p>Hobbies: {profile.hobbies + ' '}</p>
                    </span>
                </article>
            )
            }
        )}
        </section>
    </div>
  )
};

export default AllProfiles;