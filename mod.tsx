// addEventListener("fetch", (event: FetchEvent) => {
//     console.log("The method is: ", event.request)
//     event.respondWith(new Response(`You made a ${event.request.method} request`))
// })

import { h, jsx, serve, serveStatic, json, validateRequest } from "https://deno.land/x/sift@0.3.2/mod.ts";
import { createClient } from "https://denopkg.com/chiefbiiko/dynamodb/mod.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { render } from "https://x.lcas.dev/preact@10.5.12/ssr.js";
import type { VNode } from "https://x.lcas.dev/preact@10.5.12/mod.d.ts";
import {
  contentType,
  lookup,
} from "https://raw.githubusercontent.com/usesift/media_types/34656bf398c81f2687fa5010e56844dac4e7a2e9/mod.ts";


const App = () => (
  <div>
    <head>
      <meta charset="UTF-8"/>
      <title>Sign In</title>
      <link rel="stylesheet" href="style.css" />
    </head>

    <body>
      <form id="signin" action="/signin" method="POST">
        <input id="user" name="user" placeholder="user" type="text"></input>
        <br />
        <input id="pass" name="pass" placeholder="pass" type="text"></input>
        <br />
        <button id="submit" type="submit">Sign In</button>
      </form>
    </body>
  </div>
);


const Secret = () => (
  <div>
    <head>
      <meta charset="UTF-8"/>
      <title>Task Manager</title>
      <link rel="stylesheet" href="style.css"/>
      <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-beta1/jquery.min.js"></script>
      <script src="index.js"></script>
    </head>
    <body>
      <div id="create">
        <input id="task" placeholder="enter new task" type="text"></input>
        <button id="task-button" onclick="addTask()">Add Task</button>
        <button id="retrieve" onclick="getTasks()">Get Tasks</button>
      </div>
      <ul id="task-list"></ul>
    </body>
  </div>
)

const NotFound = () => (
  <div>
    <h1>Page not found</h1>
  </div>
);


// serve({
//   "/": () => jsx(<App />),
//   "/secret": () => jsx(<Secret />),
//   // "/api": (req, params) => console.log(req, params),
//   // "/api": (req, params) => apiRouter(req, params),
//   "/api": (req, params) => app,
//   "/api/:id": (req, params) => apiRouter(req, params),
//   "/:filename+": serveStatic(".", { baseUrl: import.meta.url}),
//   404: () => jsx(<NotFound />, { status: 404 }),
// });



const router = new Router();
router
  .get("/", (ctx) => {
    ctx.response.headers.set("Content-Type", "text/html; charset-utf8");
    ctx.response.body = render(<App></App>);
  })
  .get("/style.css", (ctx) => {
    ctx.response.headers.set("Content-Type", "text/css");
    ctx.response.body = render(`
    body {
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    
    .title {
      margin: 0 auto;
      width: 50%;
      text-align: center;
      padding-bottom: 10px;
    }
    
    .remove {
      display: inline-block;
      float: right;
      width: 15px;
      height: 15px;
    }
    
    #signin {
      margin: auto;
      width: 25%;
      padding-top:5%;
      text-align: center;
      background-color: #d3d3d3;
      border: 1px solid black;
    }
    
    #submit-button {
      margin-bottom: 10px;
    }
    
    input {
      margin-bottom: 10px;
    }
    
    #create{
      margin: 0 auto;
      width: 50%;
      text-align: center;
      margin-top: 3%;
    }
    
    #task-list {
      width: 50%;
      margin: 0 auto;
      text-align: center;
    }
    
    .task {
      list-style-type: none;
      min-width: 150px;
      border: 1px solid black;
      text-align: center;
    }
    `);
  })
  .get("/secret", (ctx) => {
    ctx.response.headers.set("Content-Type", "text/html; charset-utf8");
    ctx.response.body = render(<Secret></Secret>);
  })
  // .get("/secret", (ctx) => 
  //     ctx.response.body = render(<Secret></Secret>),
  //   )
  // .get("/secret", (ctx) => 
  //     ctx.response.body = render(<Secret></Secret>),
  //   )




  // .get("/", (ctx) => {
  //   ctx.response.body = dyno.scan({
  //     "TableName": "items"
  //   })
  // })


  // if (req.method === 'GET') {
  //   const tasks = await dyno.scan({
  //     "TableName": "items"
  //   })
  //   return json(tasks.Items, {status:200})
  // }

const app = new Application();
app.addEventListener("error", (evt) => {
  console.log("you fucked up")
    console.log(evt.error);
  });

  app.use((ctx) => {
    // Will throw a 500 on every request.
    ctx.throw(404);
  });

app.use(router.routes());
app.use(router.allowedMethods());


addEventListener("fetch", app.fetchEventHandler()); // Equiv of listen in Deploy




// if config/credentials not passed they will be read from the env/fs
const dyno = createClient();
// the client has all of DynamoDB's operations as camelCased async methods
const result = await dyno.listTables();
console.log(result)

// const table = {
//   "AttributeDefinitions": [ 
//      { 
//         "AttributeName": "_id",
//         "AttributeType": "N"
//      }
//   ],
//   "KeySchema": [ 
//     { 
//        "AttributeName": "_id",
//        "KeyType": "HASH"
//     }
//  ],
//  "TableName": "items",
//  "BillingMode": "PAY_PER_REQUEST",
// }


// dyno.createTable(table)



 




const testTasks = [{_id: 1234, item: "stuff to do", created_at: 12345}]

const apiRouter = async (req, params) => {
  // const { error, body } = await validateRequest(req, {
  //   POST: {
  //     body: ["item","_id"],
  //   },
  // });
  // if (error) {
  //   console.log(body)
  //   return json({ error: error.message }, { status: error.status });
  // }
  // console.log(req)
  // console.log(body)
  if (req.method === 'GET') {
    const tasks = await dyno.scan({
      "TableName": "items"
    })
    return json(tasks.Items, {status:200})
  }
  if (req.method === 'POST') {
    const put = await dyno.putItem({
      "TableName": "items",
      "Item": {
        "_id": 12,
        "item": req.body,
        },
    })
    // console.log(req)
    return json({}, {status:201})
  }
  if (req.method === 'DELETE') {
    console.log(params.id)
    return json({}, {status:200})
  }
  return json({message: "Method not implemented"}, {status:404})
}

