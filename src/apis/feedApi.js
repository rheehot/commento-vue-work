import axios from "./setting";
import qs from "qs";

const getAds = async limit => {
  const response = await axios.get("/api/ads", {
    params: {
      page: 1,
      limit
    }
  });

  const adList = response.data.list.data;
  return adList.map(ad => ({
    img: ad.img,
    title: ad.title,
    contents: ad.contents
  }));
};

export default async function getPostsFromApi(ord, categories, limit) {
  const ads = await getAds(limit / 4);
  const response = await axios.get("/api/list", {
    params: {
      ord,
      limit,
      page: 1,
      category: categories.map(category => category.id)
    },
    paramsSerializer: params => qs.stringify(params)
  });
  const list = response.data.list.data;
  const result = [];

  let adIdx = 0;
  for (let i = 0; i < list.length; i++) {
    if (i !== 0 && i % 4 === 0) result.push(ads[adIdx]);
    const item = list[i];
    result.push({
      categoryName: categories.filter(
        category => category.id === item.category_id
      )[0].name,
      categoryId: item.category_id,
      userId: item.user_id,
      created: item.created_at,
      title: item.title,
      contents: item.contents
    });
  }
  return result;
}
