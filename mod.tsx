// addEventListener("fetch", (event: FetchEvent) => {
//     console.log("The method is: ", event.request)
//     event.respondWith(new Response(`You made a ${event.request.method} request`))
// })

import { h, jsx, serve, serveStatic, json, validateRequest } from "https://deno.land/x/sift@0.3.2/mod.ts";
import { createClient } from "https://denopkg.com/chiefbiiko/dynamodb/mod.ts";

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
        "_id": 1234111,
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

serve({
  "/": () => jsx(<App />),
  "/secret": () => jsx(<Secret />),
  // "/api": (req, params) => console.log(req, params),
  "/api": (req, params) => apiRouter(req, params),
  "/api/:id": (req, params) => apiRouter(req, params),
  "/:filename+": serveStatic(".", { baseUrl: import.meta.url}),
  404: () => jsx(<NotFound />, { status: 404 }),
});