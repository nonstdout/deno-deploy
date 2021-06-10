# deno-deploy

## stuff to do

- [] Link git project to entrypoint (mod.tsx)
- [] Set up and test serving static files
- [] Set up and test Dynamo db
- [] Design the base api endpoints in sift, should model the to do app
    - [] /GET all to do's
    - [] /POST add a new to do
    - [] /Delete to do
    - [] /PATCH to do (optional) - edit
- [] Create tables and model in DynamoDB for to dos
    - [] todos table
    - [] model 
        - title (key): String
        - content : String
        - completed : Bool
- [] Figure out how to push to git from the Phlappjack app
- [] Need to hit the AWS api to push the created models into Dynamo
- [] figure out where we want to save the users state so they can close/re-open the .exe at the same point



- Create a front end todo app (optional to upgrade to React)



## Process

1. User has built or is building a front end app (either in CRA or JS or Vue, whatever), they then get to the point they need some functionality (DB/endpoints).
2. User goes to phlappjack.com and downloads the .exe for their OS.
3. User fires up Phlapp and...
    1. Enters AWS API key for Dynamo to work (potentially set up Dynamo DB via API)
    2. Creates models
    3. Press save
4. User creates required endpoints...
    1. serve static files on a designated path
    2. download todos from dynamo etc
    3. arrange endpoints in the correct order (drag n drop)
    4. save config
5. User enters git details or connects with git (OAuth optional).
6. Pressing Export button sends files to git which kicks off build in DENO deploy.
6a. Figure out a way to link deno deploy with git repo and add ENV vars for AWS DB.
7. Send a confirmation message from Deno Deploy listing the config that has been set up.
8. User tests their app using the new endpoints.


Kellen
- [] github api file uploads

Jin
- [] AWS api and DynamoDB (create models), example available in Deno Deploy docs
- [] Is it possible to create a Dynamodb instance from the API?

Chris 
- [x] Create Sift endpoints
- [x] Work on getting a to do app demo ready (take the one from assesment)
- [] Read the Deploy API docs to see if it's possible to link to git hub and add env vars for Dynamo 

She/He
- [] Working on the front end functionality, integration of endpoints and the DnD