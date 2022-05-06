# Grid and Cloud. Database perfomance comparison

## Demo
To watch a short demo you can use the following link: <br/>
https://youtu.be/LsMp2AqiLtM

## Stack
**Server:** Node.js <br/>
**Database:** mongoDB

## Business model
**Entity:** <code>User</code> <br/>
**Fields:**<br/>
| Field      | Type |
| :---        |    :----:   | 
| Id      | <em>int</em>       | 
| Name   | <em>string</em>        | 

## Connection types
We have three connection types: 
1. **Local mongoDB:** use <code>mongo mongodb://127.0.0.1:28018</code> command to connect to database
2. **Docker container:** use <code>mongo mongodb://liza:123@127.0.0.1:27017/sample</code> command to connect to database
3. **Cloud mongoDB**

## Statistics
We use the command <code>npm run tests</code> to start the process of writing 100 items 
to databases and see the comparison over time when using three types of connections: local, container and cloud<br/><br/>

### Operations
The application uses four operations: <code>insertMultiple</code>, <code>insertSeparate</code>, 
<code>findMultiple</code> and <code>findSeparate</code>
1. **insertMultiple:** inserts an array of mock data into database using only one operation <code>insertMany</code>
2. **insertSeparate:** inserts an array of mock data one by one. For each mock item we are calling one operation <code>insertOne</code> in database
3. **findMultiple:** finds a subset of mock data in the database using one operation <code>find</code> for all mock data items
4. **findSeparate:** finds a subset of mock data in the database using one operation <code>findOne</code> for each mock data item<br/><br/>
  
### Results

**Operation:** <code>insertMultiple</code> 
| (index)      | time | avg |
| :----:       |    :----:   | :----:  |
| local    | 13      | null |
| container   | 6       | null |
| cloud | 495 | null |


**Operation:** <code>insertSeparate</code> 
| (index)      | time | avg |
| :----:       |    :----:   | :----:  |
| local    | 70      | 0.64 |
| container   | 166       | 1.63 |
| cloud | 10254 | 102.46 |


**Operation:** <code>findMultiple</code> 
| (index)      | time | avg |
| :----:       |    :----:   | :----:  |
| local    | 7      | null |
| container   | 4       | null |
| cloud | 181 | null |


**Operation:** <code>findSeparate</code> 
| (index)      | time | avg |
| :----:       |    :----:   | :----:  |
| local    | 95      | 0.89 |
| container   | 175       | 1.7 |
| cloud | 6526 | 65.14 |

- As you can see, when using only one operation to insert or search 100 items
(<code>insertMultiple</code>, <code>findMultiple</code>) the database with container type connection has the best performance <br/>
- When we use one by one insert or find for each element (<code>insertSeparate</code>, <code>findSeparate</code>) 
the local database has the best perfomance. The average time to insert item and to search it is less than 1 ms <br/>
- In all operations the cloud database has the worst performance

## Fill database

To fill the database with mock data, we use the command <code>npm run fill</code> <br/>
We have function <code>fillDbs</code> to fill databases with mock data to test that databases connected successfully

### Example
1. Connecting to the local database using <code>mongo mongodb://127.0.0.1:28018</code> <br/>
2. Use <code>use sample</code> command and switch to sample database
3. Use <code>db.testing.find().pretty()</code> command to find all items in local database

#### Sample result
<img width="494" alt="Screenshot 2022-05-06 at 2 52 01 AM" src="https://user-images.githubusercontent.com/43758226/167044946-28cd0fa4-57cc-41fa-81d5-cb6b5b51f859.png">

## Clear database
To clear the database we use the command <code>npm run clear</code> <br/>
We have function <code>clearDbs</code> to clear databases from mock data

### Example
1. Connecting to the local database using <code>mongo mongodb://127.0.0.1:28018</code> <br/>
2. Use <code>use sample</code> command and switch to sample database
3. Use <code>db.testing.find()</code> command to find all items in local database. In demo you can see, that we have an empty database
<img width="707" alt="Screenshot 2022-05-06 at 2 58 20 AM" src="https://user-images.githubusercontent.com/43758226/167045482-c69248f3-e683-460b-b136-b50dc1d66c4a.png">

## Conclusion
- Depending on the type of insertion or search of items (do we use one function to insert and to search or do it one by one), either a local or a container database shows the best performance
- In any case, the cloud database has the worst performance
