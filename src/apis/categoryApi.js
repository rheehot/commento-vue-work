import axios from "./setting";

export default async function() {
  const response = await axios.get("/api/category");
  const categoryList = response.data.list;
  return categoryList.map(category => ({ ...category, checked: true }));
}
