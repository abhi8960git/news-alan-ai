import React, { useEffect, useState } from 'react'
import getNews from './getNews'
import './main.css'
import moment from 'moment';
import {motion} from 'framer-motion'

import alanBtn from '@alan-ai/alan-sdk-web';
import { AnimatePresence } from 'framer-motion';

function NewsData() {
    const [newsData, setNewsData] = useState([]);
    const [category, selectcategory] = useState('');
    const alanKey = '0d1b1dd3eadbeee2a0a7e32ea553df892e956eca572e1d8b807a3e2338fdd0dc/stage';

    const getAllNews = async () => {
        let data = await getNews(category);
        setNewsData(data.data.articles)




    }
    useEffect(() => {
        getAllNews();
    }, [category])

    const selectCategory = (event) => {
        // console.log(event.target.value);
        selectcategory(event.target.value);

    }

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: (command) => {
                if (command) {
                    // Call the client code that will react to the received command
                    selectcategory(command.data);
                    console.log(command);
                }
            }
        });
    }, []);


    return (
        <div className='main'>
            <h1>Voice News</h1>
            <label for="cars">Choose a car:</label>

            <select className='select-box'
                name="category"
                id="category"
                onChange={selectCategory}
                value={category}

            >
                <option value="General">general</option>
                <option value="business">business</option>
                <option value="Health">health</option>
                <option value="sports">sports</option>
            </select>

            <motion.div className='grid'>
                <AnimatePresence>
                {newsData.map((news) => {

                    return (
                        <div className='news-box'>


                            <p className='title'>{news?.title}</p>
                            <img src={news?.urlToImage} alt="" className='image' />

                            <p>{news?.description}</p>

                            <div className="space-between">
                                <p>Author: {news?.author ? news.author : "Auther name is not available"}</p>

                                {/* <p>{news?.content}</p> */}
                                <p>{moment(news?.publishedAt).format('LLL')}</p>
                            </div>
                            <a href={news.url}>Read More..</a>

                        </div>
                    )
                })}
                </AnimatePresence>

            </motion.div>
        </div>
    )
}

export default NewsData