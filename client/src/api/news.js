import { BASE_URL, FLASK_URL } from "../config";

const getNews = async (token, query) => {
  try {
    const res = await fetch(
      BASE_URL + "api/news?" + new URLSearchParams(query),
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getNew = async (newsId, token) => {
  try {
    const res = await fetch(BASE_URL + "api/news/" + newsId, {
      headers: {
        "x-access-token": token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const createNews = async (news, user) => {
  try {
    const res = await fetch(BASE_URL + "api/news", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(news),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const predictNews = async (news) => {
  try {
    const res = await fetch(FLASK_URL + "predictnews", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Origin": "http://localhost:3000"
      },
      body: JSON.stringify(news),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export {
  getNew,
  createNews,
  getNews,
  predictNews
};