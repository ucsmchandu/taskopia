import React from 'react'
import axios from 'axios';
const ragChat =async (question) => {
    const url = `${import.meta.env.VITE_BACKEND_BASE}/taskopia/ai/api/rag-chat`;

    const res=await axios.post(url,{question},{withCredentials:true});
    
    return res.data;
}

export default ragChat