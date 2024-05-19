import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { isLoggedIn } from "../../helpers/authHelper";
import { getNews } from "../../api/news";
import Loading from "../others/Loading";
import NewsTile from "../news/NewsTile";


const DashNews = () => {
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState([]);
    const user = isLoggedIn();

    const fetchNews = async () => {
        let onego = 3;
        setLoading(true);
        let query = {
            onego: onego
        };
        const data = await getNews(user && user.token, query);
        setLoading(false);
        if (!data.error) {
            setNews([...data.data]);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between bg-zinc-900 rounded-lg px-6 py-4 ">
                <div className="flex items-center space-x-3">
                    <NewspaperIcon sx={{ color: "white", fontSize: 28 }} />
                    <div className="text-zinc-100 text-lg">Latest News</div>
                </div>
                <Link to={"/news"} className="text-zinc-100 text-lg">
                    <img src="/icons/redirect.svg" alt="" />
                </Link>
            </div>
            {!loading ? (
                news &&
                news.map((item, index) => (
                    <NewsTile view="secondary" data={item} key={index} />
                ))
            ) : (
                <div className="flex items-center justify-center w-full py-8 bg-zinc-900 rounded-lg">
                <Loading />
                </div>
            )}
        </div>
    );
}

export default DashNews;