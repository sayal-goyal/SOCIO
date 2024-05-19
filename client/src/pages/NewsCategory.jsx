import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsTile from "../components/news/NewsTile";
import { getNews } from "../api/news";
import { isLoggedIn } from "../helpers/authHelper";
import Loading from "../components/others/Loading";
import End from "../components/others/End";
import { GrayTheme } from "../components/theme/Button";
import { Button, ThemeProvider, Stack } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NewspaperIcon from '@mui/icons-material/Newspaper';

const NewsCategory = () => {
    const navigate = useNavigate();
    const params = useParams()
    const upperCaseFirstLetter = string => `${string.slice(0, 1).toUpperCase()}${string.slice(1)}`;
    const lowerCaseAllWordsExceptFirstLetters = string => string.replace(/\S*/g, word => `${word.slice(0, 1)}${word.slice(1).toLowerCase()}`);


    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [more, setMore] = useState(true);
    const [count, setCount] = useState(0);
    const user = isLoggedIn();

    const fetchNews = async () => {
        let onego = 12;
        setLoading(true);
        const newPage = page + 1;
        setPage(newPage);
        let query = {
            page: newPage,
            onego: onego,
            category: params.category
        };

        const data = await getNews(user && user.token, query);
        setLoading(false);
        if (!data.error) {
            setNews([...news, ...data.data]);
            setCount(data.count);
            if (news.length === count && count !== 0) { setMore(false) }
            if (onego>count) { setMore(false) }
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div className="flex flex-col space-y-24 mt-3">
            <div className="flex flex-col space-y-5">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <NewspaperIcon sx={{ color: "white", fontSize: 44 }} />
                        <div className="text-zinc-100 text-3xl mt-1">{upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(params.category))} News</div>
                    </div>
                    <ThemeProvider theme={GrayTheme}>
                        <Stack gap={2} alignItems="center">
                            <Button
                                variant="outlined"
                                onClick={() => navigate("/news")}
                                startIcon={<ArrowBackIcon />}
                                sx={{
                                    color: "#fff", backgroundColor: "#27272A", py: 0.6, px: 3, borderColor: "#918E95", '&:hover': {
                                        borderColor: "#B9B5BD",
                                    }, fontSize: 16
                                }}>
                                All News
                            </Button>
                        </Stack>
                    </ThemeProvider>
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
        </div>
    )
}

export default NewsCategory;