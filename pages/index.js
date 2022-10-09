import dynamic from "next/dynamic";
const MainPage = dynamic(() => import("../components/MainPage/MainPage"));
// export const config = {
//   unstable_runtimeJS: false,
// };

const Index = () => {
  return <MainPage />;
};


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
