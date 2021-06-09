import { Application, send } from "https://deno.land/x/oak/mod.ts";
import * as path from "https://deno.land/std@0.97.0/path/mod.ts";

const app = new Application();

app.use(async (context) => {
    await send(context, context.request.url.pathname, {
        root: path.fromFileUrl(new URL("./public", import.meta.url)),
        index: "index.html",
    }).catch(async (e) => {
        console.log(e) 
    })
});

addEventListener("fetch", app.fetchEventHandler());



