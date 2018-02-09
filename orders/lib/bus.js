const { compose, assoc } = require("ramda");
const AWS = require("aws-sdk");
const TOPIC_NAME = process.env.TOPIC_NAME; 
const AWS_ACCOUNT_ID = process.env.AWS_ACCOUNT_ID;
const OFFLINE_AWS_ACCOUNT_ID = "123456789012";
const IS_OFFLINE = eval(process.env.IS_OFFLINE);

AWS.config.update({ region: "us-east-1" });

const createSnsConnection = () =>
  IS_OFFLINE ?
    new AWS.SNS({ endpoint: "http://127.0.0.1:4002" }) :
    new AWS.SNS();

const buildTopicArn = () => {
  const accountId = IS_OFFLINE ? OFFLINE_AWS_ACCOUNT_ID : AWS_ACCOUNT_ID;
  return `arn:aws:sns:us-east-1:${accountId}:${TOPIC_NAME}`;
};

const createEventBusClient = (sns = createSnsConnection()) => ({
  publish: (event, success, failure) => {
    const TopicArn = buildTopicArn();
    const Message = compose(JSON.stringify, assoc("default", "json"))(event);

    sns.publish({ Message, TopicArn }, error =>
      error ? failure(error) : success(Message)
    );
  }
});

module.exports = createEventBusClient;
