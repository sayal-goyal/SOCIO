const mongoose = require("mongoose");
const News = require("../models/news");
const paginate = require("../util/paginate");

const createNews = async (req, res) => {
    try {
        const { headline, short_description, link } = req.body;

        if (!(headline && short_description && link)) {
            throw new Error("All input required");
        }

        const news = await News.create({
            headline,
            short_description,
            link
        });

        res.json(news);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const getNew = async (req, res) => {
    try {
        const newsId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(newsId)) {
            throw new Error("News does not exist");
        }

        const news = await News.findById(newsId)
                .lean();

        if (!news) {
            throw new Error("News does not exist");
        }

        return res.json(news);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const getNews = async (req, res) => {
    try {
        let { page, category, onego } = req.query;

        sortBy = "-createdAt";
        if (!page) page = 1;
        if (!onego) onego = 12;

        let news = await News.find()
            .sort(sortBy)
            .lean();

        if (category) {
            news = news.filter((item) => item.category == category);
        }

        const count = news.length;
        if(count<onego) {onego=count}

        news = paginate(news, onego, page);

        return res.json({ data: news, count });
    } catch (err) {
        console.log(err.message);
        return res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getNew,
    getNews,
    createNews
};