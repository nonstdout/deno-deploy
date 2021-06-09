import { serve, serveStatic } from "https://deno.land/x/sift@0.3.2/mod.ts";


// const getIndex = async () => {
//     const index = new URL("index.html", import.meta.url);
//     // console.log(index)
//     // console.log(fetch(index))
//     const response = await fetch(index)
//     return new Response(response.body)
// }

serve({
//   // You can serve a single file.
//   "/": () => new Response('hi'),
  "/": () => serveStatic("/index.html", { baseUrl: import.meta.url }),
//   "/hi": () => getIndex(),
//   // Or a directory of files.
//   "/:filename+": serveStatic("public", { baseUrl: import.meta.url }),
//   // Serve files hosted on the internet.
//   // The URL to the resouce would become https://yourbucket.aws.com/profile.png
//   "/profile.png": serveStatic("profile.png", {
//     baseUrl: "https://yourbucket.aws.com",
//   }),
//   // You can modify the fetched response before returning to the request
//   // by using the intervene option.
  "/style.css": serveStatic("public/style.css", {
    baseUrl: import.meta.url,
    // The intervene function is called with the request as first argument and
    // the fetched response as the second argument and it should return a
    // response as a result.
    intervene: (request, response) => {
      response.headers.set("content-type", "text/css; charset=utf-8");
      return response;
    },
  }),
});


// async function handleRequest(request: Request) {
//     const { pathname } = new URL(request.url);
//     console.log(request)
  
//     // This is how the proxy works:
//     // 1. A request comes in for a specific asset.
//     // 2. We construct a URL to that asset.
//     // 3. We fetch the asset and respond to the request.
  
//     // Check if the request is for style.css.
//     // if (pathname.startsWith("/style.css")) {
//     //   //  Construct a new URL to style.css by using the URL
//     //   //  of the script (mod.ts) as base (import.meta.url).
//     //   const style = new URL("style.css", import.meta.url);
//     //   // Fetch the asset and return the fetched response
//     //   // to the client.
//     //   try {
//     //       return fetch(style);
          
//     //   } catch (error) {
//     //       console.log(error)
//     //   }
//     // }
//     // Check if the request is for style.css.
//     if (pathname === "/") {
//       //  Construct a new URL to style.css by using the URL
//       //  of the script (mod.ts) as base (import.meta.url).
//       const index = new URL("index.html", import.meta.url);
//       // Fetch the asset and return the fetched response
//       // to the client.
//     //   console.log(await fetch(index))
//       return fetch(index)
//     }
//     // Check if the request is for style.css.
//     if (pathname.startsWith("/smiley.png")) {
//       //  Construct a new URL to style.css by using the URL
//       //  of the script (mod.ts) as base (import.meta.url).
//       const smiley = new URL("smiley.png", import.meta.url);
//       // Fetch the asset and return the fetched response
//       // to the client.
//     //   return fetch(smiley, {headers:{accept: 'image/png'}})
//       let response = await fetch(smiley);
//       if (!response.ok) {
//           throw new Error('broken')
//       }
//     //   let myBlob = await response.blob()
//       let myBlob = response.blob()
//     //   let myImage = URL.createObjectURL(myBlob)
//       return new Response(myBlob, {'headers': {'Content-Type': 'image/png'}})
//     }
//     // Check if the request is for style.css.
//     // if (pathname.startsWith("/text.txt")) {
//     //   //  Construct a new URL to style.css by using the URL
//     //   //  of the script (mod.ts) as base (import.meta.url).
//     //   const text = new URL("text.txt", import.meta.url);
//     //   // Fetch the asset and return the fetched response
//     //   // to the client.
//     //   try {
//     //     return fetch(text);
//     //   } catch (error) {
//     //       console.log(error)
//     //   }
      
//     // }
  
//     console.log('fell through')
//     // return new Response("test", {headers: {"content-type":"text/html"}})
//     return new Response(
//       `<!DOCTYPE html>
//       <html lang="en">
      
//       <head>
//           <meta charset="UTF-8">
//           <meta http-equiv="X-UA-Compatible" content="IE=edge">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <link rel="stylesheet" href="style.css">
//           <title>Document</title>
//       </head>
      
//       <body>
//           Hello world!
//           <!-- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png"> -->
//           <embed src="text.txt" type="text/html">
//       </body>
      
//       </html>`,
//       {
//         headers: {
//           "content-type": "text/html; charset=utf-8",
//         },
//       },
//     );
//   }
  
//   addEventListener("fetch", (event: FetchEvent) => {
//     event.respondWith(handleRequest(event.request));
//   });