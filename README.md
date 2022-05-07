# mysql2-http-proxy
A simple HTTP proxy for MySQL, designed for serverless environments like Cloudflare Workers. Inspired by isaac-mcfadyen/mysql-http-proxy 

### 😔 The Problem
Serverless environments such as AWS Lambda are not suited for database connections. Traditional databases such as MySQL can be easily slowed to a crawl by handling too many connections; plus, as of March 2022, Cloudflare Workers don't even support TCP which relation databases require!

### 🎉 The Solution
Enter `mysql2-http-proxy`. It sits on a server and acts as a super-simple database proxy, exposing an HTTP endpoint and ensuring only one connection is ever open to your database at once.

### 🤔 How to Use
Spin up a server anywhere you desire. Clone the repo, rename the `.env.template` file to `.env` and modify your MySQL endpoint, next set the TOKEN_AUTHORIZATION. Run `npm run start` and away you go! 🚀


#### request:
The REQUIREMENT is to provide the set token in the header:
```
authorization: Token <YOUR_SET_TOKEN>
```
------------
###### /query

Run a query to `http://endpoint:8080/query` with a body of:
```javascript
{
  "query": "YOUR_REGULAR_SQL_QUERY_HERE"
}
```
###### /execute

Run a execute to `http://endpoint:8080/execute` with a body of:
```javascript
{
  "query": "YOUR_REGULAR_SQL_QUERY_HERE"
  "parameters": ['parameter1', 'parameter2']
}
```

the response to your SQL request in JSON.
