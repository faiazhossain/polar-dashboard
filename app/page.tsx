// "use client";
// import React from "react";
// import { useQuery, useIsFetching } from "@tanstack/react-query";
// const Home = () => {
//   const {
//     data: todosData,
//     isLoading,
//     isError,
//     isSuccess,
//   } = useQuery<any>({
//     queryKey: ["todos"],
//     queryFn: () =>
//       fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
//         res.json()
//       ),
//   });
//   if (isLoading) {
//     return <main>....Loading</main>;
//   }
//   return (
//     <main>
//       <h1>Todos</h1>
//       <div>
//         {todosData?.map((todo: any) => (
//           <div key={todo.id}>{todo.title}</div>
//         ))}
//       </div>
//     </main>
//   );
// };

// export default Home;
import React from "react";

const Home = () => {
  return <div>Home</div>;
};

export default Home;
