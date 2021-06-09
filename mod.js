import { serve, serveStatic } from "https://deno.land/x/sift@0.3.2/mod.ts";

serve({
    // You can serve a single file.
    "/": serveStatic("public/index.html", { baseUrl: import.meta.url }),
    // Or a directory of files.
    "/:filename+": serveStatic("public", { baseUrl: import.meta.url }),
    // Serve files hosted on the internet.
    // The URL to the resouce would become https://yourbucket.aws.com/profile.png
    // "/profile.png": serveStatic("profile.png", {
    //     baseUrl: "https://yourbucket.aws.com",
    // }),
    // You can modify the fetched response before returning to the request
    // by using the intervene option.
    "/style.css": serveStatic("style.css", {
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