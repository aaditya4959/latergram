import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useContent(){
    const [contents, setContents] = useState([]);

    function refresh(){
        axios.get(`${BACKEND_URL}/api/v1/content`,{
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((response) => {
            setContents(response.data.content);
        })
    }

    useEffect(() => {
        refresh();
        let interval = setInterval(() =>{
            refresh()
        },2000)

        return () => {
            clearInterval(interval);
        }
    },[])

    return contents;
}