import { serve, serveStatic } from "https://deno.land/x/sift@0.3.2/mod.ts";

serve({
    "/:filename+": serveStatic("public", { baseUrl: import.meta.url }),
    "/style.css": serveStatic("style.css", {
        baseUrl: import.meta.url,
        intervene: (request, response) => {
            response.headers.set("content-type", "text/css; charset=utf-8");
            return response;
        },
    }),
});