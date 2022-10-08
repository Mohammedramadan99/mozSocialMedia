import dynamic from "next/dynamic";
const MainPage = dynamic(() => import("../components/MainPage/MainPage"));
import { wrapper } from "../store/store";
import { fetchPostsAction } from "../store/postsSlice";
// export const config = {
//   unstable_runtimeJS: false,
// };

const Index = () => {
  return <MainPage />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
  async ({ req, res }) =>
  {
    const response = await fetch("http://localhost:3000/api/posts");
    const { data } = await response.json();
    await store.dispatch(fetchPostsAction());
  });
export default Index;

// export const getServerSideProps = async (ctx) => {
//   await dbConnect();
//   const res = await axios.get("http://localhost:3000/api/posts");
//   console.log("posts" + res.data);
//   return {
//     props: {
//       posts: res.data,
//     },
//   };
// };
