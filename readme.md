
<h3>Technology Used Typescript , Swagger and Express </h3>
<span>Drive link-:  tutorial or demo  video link</span>

<h4>Assumtions</h4s>
0) router,controller,db file  for future api's  like admin ,etc
1) marks are same in single category (easy ,..etc)
2) user  is  sharing  distributed marks  such that it can be fully utilised for each category. 

<h4>ToDo</h4s>
Note-: comments have been added for ToDo Section (down in last section)
1) add  Question Selection Algorithm for leftout or unutilised marks,
2) add Topic wise Selection logic  if we  want topic wise*

<h4>Importants</h4>
-> If you have deleted dist folder (compiled node  js code) then there is default question list to be added by uncommenting  the line number 133 at index.ts and
(*Run  tsc -w  to check for any error and update for any changes )
then  hit  "/"  api  from swagger 

(Note - *Run  tsc -w  to check for any error and update for any changes )

<h3>Start/Run<h3>
Run application using npm start (localhost:3000)

Access/Swagger  Documentation - open localhost:3000/api-docs


We can hit API's directly from there.

<h4>Architecture / Design</h4>
- model (controller,router ,utility, database)
- Design Principle- Modules, Singleton and more...

<h4>File Structure</h4>
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
        // TODO Selection Algorithm if marks are  not equal for difficulty level

There are few scene if marks are not equal in single category then,
we have to add selection algorith to select as many as questions in particular category(eg. easy)
and if marks are left to be used in other category(eg. medium/hard)  

.) //ToDo chacge parameter with TopicWiseDifficulty 
Add Topic wise logic when we want to slect topic wise questions


