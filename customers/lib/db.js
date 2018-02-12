const AWS = require("aws-sdk");
const IS_OFFLINE = eval(process.env.IS_OFFLINE);

AWS.config.update({ region: "us-east-1" });

const createDynamoDbConnection = () =>
  IS_OFFLINE ?
    new AWS.DynamoDB.DocumentClient({ endpoint: "http://localhost:8000" }) :
    new AWS.DynamoDB.DocumentClient();

const createDatabaseClient = (dynamoDb = createDynamoDbConnection()) => ({
  find: (TableName, id, success, failure) => {
    dynamoDb.get({ TableName, Key: { id } }, (error, result) =>
      (error || !result || !result.Item) ? failure(error) : success(result.Item)
    );
  },

  all: (TableName, success, failure) => {
    dynamoDb.scan({ TableName }, (error, result) =>
      (error || !result || !result.Items) ? failure(error) : success(result.Items)
    );
  },

  save: (TableName, Item, success, failure) => {
    dynamoDb.put({ TableName, Item }, (error) =>
      error ? failure(error) : success(Item)
    );
  }
});

module.exports = createDatabaseClient;
