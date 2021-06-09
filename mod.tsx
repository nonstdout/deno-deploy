// addEventListener("fetch", (event: FetchEvent) => {
//     console.log("The method is: ", event.request.method)
//     event.respondWith(new Response(`You made a ${event.request.method} request`))
// })


import { h, jsx, serve, serveStatic } from "https://deno.land/x/sift@0.3.2/mod.ts";

const App = () => (
  <div>
    <head >
      <link rel="stylesheet" href="/style.css" />
      <link rel="stylesheet" href="./style.css" />
      <link rel="stylesheet" href="style.css" />
    </head>
    <h1>Hello world!</h1>
    <img src="smiley.png" alt="" />
    <img src="./smiley.png" alt="" />
    <img src="/smiley.png" alt="" />
    <img src="PHlappstack.gif" alt="" />
    <img src="./PHlappstack.gif" alt="" />
    <img src="/PHlappstack.gif" alt="" />
  </div>
);

const NotFound = () => (
  <div>
    <h1>Page not found</h1>
  </div>
);

serve({
  "/": () => jsx(<App />),
  "/:filename+": serveStatic(".", { baseUrl: import.meta.url, Cache:false}),
  404: () => jsx(<NotFound />, { status: 404 }),
});