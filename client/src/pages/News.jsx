import React, { useState, useEffect } from "react";
import { getNews } from "../api/news";
import { isLoggedIn } from "../helpers/authHelper";
import NewsCategoryTile from "../components/news/NewsCategoryTile";
import { data } from "../components/news/NewsImages"
import NewsTile from "../components/news/NewsTile";
import AddNews from "../components/news/AddNews";
import Loading from "../components/others/Loading";
import End from "../components/others/End";
import CategoryIcon from '@mui/icons-material/Category';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [more, setMore] = useState(true);
    const [count, setCount] = useState(0);
    const user = isLoggedIn();

    const fetchNews = async () => {
        setLoading(true);
        const newPage = page + 1;
        setPage(newPage);
        let query = {
            page: newPage,
            onego: 12
        };

        const data = await getNews(user && user.token, query);
        setLoading(false);
        if (!data.error) {
            setNews([...news, ...data.data]);
            setCount(data.count);
            if (news.length === count && count!==0) { setMore(false) }
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div className="flex flex-col space-y-24 mt-3">
            <div className="flex flex-col space-y-5">
                <div className="flex items-center space-x-4">
                    <CategoryIcon sx={{ color: "white", fontSize: 44 }} />
                    <div className="text-zinc-100 text-3xl mt-1">News Categories</div>
                </div>
                <div className="grid grid-cols-4 gap-x-6 gap-y-8">
                    {data.map((item, index) => (
                        <NewsCategoryTile
                            type={item.type}
                            key={index}
                            img={item.img}
                        />
                    ))}
                </div>
            </div>
            <div className="flex flex-col space-y-5">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <NewspaperIcon sx={{ color: "white", fontSize: 44 }} />
                        <div className="text-zinc-100 text-3xl mt-1">Latest News</div>
                    </div>
                    <AddNews />
                </div>
                {loading ? <Loading /> :
                    <InfiniteScroll
                        dataLength={12}
                        className="grid grid-cols-4 gap-6"
                        next={fetchNews}
                        hasMore={more}
                        loader={<Loading />}
                        endMessage={<div className="col-span-4"><End /></div>}>
                        {news.map((item, index) => (
                            <NewsTile view="primary" data={item} key={index} />
                        ))}
                    </InfiniteScroll>}
            </div>
        </div >
    )
}

export default News;