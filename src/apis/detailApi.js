import axios from "./setting";

export default async function getDetailFromApi(id) {
  const response = await axios.get("/api/view", {
    params: {
      id
    }
  });
  const info = response.data.info;
  return {
    title: info.title,
    contents: info.contents,
    created: info.created_at,
    replies: info.reply.map(r => ({
      name: r.user.name,
      created: r.created_at,
      title: info.title,
      contents: r.contents
    }))
  };
}
