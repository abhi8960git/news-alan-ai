import axios from "axios";

 export default function getNews(category='General'){
   const   API_Key='ddb57d7c79ea463cb7a508a2368e37c7';
    const  API_Endpoint=`https://newsapi.org/v2/top-headlines?country=us&category=${category}&category=business&apiKey=ddb57d7c79ea463cb7a508a2368e37c7`;

    
        // axios.get(API_Endpoint)
        // .then((response)=>{
        //     console.log(response.data.articles)
        // })
        // .catch((err)=>{
        //     console.log(err);
        // })

        return axios.get(`${API_Endpoint}&apiKey=${API_Key}`);
    }










