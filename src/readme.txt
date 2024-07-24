
Technology Used Typescript , Swagger and Express 

Importants
-> There is default question list to be added by uncommenting  the line number 133.

(*Run  tsc -w  to check for any error and update for any changes )
Run application using npm start (localhost:3000)

Access/Swagger  Documentation - open localhost:3000/api-docs

We can hit API's directly from there.

Architecture / Design
- model (controller,router ,utility, database)
- Design Principle- Modules, Singleton and more...

File Structure
-Src-
        -controller > Controller file for routes
        -database   > Database file for admin, etc
        -routes     > router files
        -utility    > commonly Access functions and services(third party)
        -index.ts   > server file        




Todo  Improvements for Scaling

In index.ts
.) // Todo Convert marks to percentage or viceversa if topic wise percentageGe
here  add validations for  topic wise percentage 

In generator.ts

.) // ToDo more Scenarios
        // Scenario 1) consider leftout marks for another section.

There are few scene if marks are not equal in single category then,
we have to add selection algorith to select as many as questions in particular category(eg. easy)
and if marks are left to be used in other category(eg. medium/hard)  

.) //ToDo chacge parameter with TopicWiseDifficulty 
Add Topic wise logic when we want to slect topic wise questions


