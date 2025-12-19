import axios from 'axios';
const getOwnerProfileData = async(firebaseId) => {
    try{
        const res=await axios.get(`http://localhost:3000/taskopia/u1/api/owner-profile/get/profile/${firebaseId}`);
        return res.data.profileData;
    }catch(err){
        console.log(err);
        console.log(err.message);
        throw new Error(err);
    }
};

export default getOwnerProfileData