'use strict';

const AWS = require('aws-sdk');

function fireCommand(event, commandName, callback) {
  const accountId = '336804879872'; // TODO: Change/make it more dynamic

  const sns = new AWS.SNS();

  const params = {
    Message: JSON.stringify(event),
    TopicArn: `arn:aws:sns:us-east-1:${accountId}:${commandName}`
  };

  sns.publish(params, (error) => {
    if (error) {
      callback(error);
    }
    callback(null, {message: 'command put onto the command bus', event});
  });
}

module.exports.create = (event, context, callback) => {
  let commandName = `command-createCustomer`;

  fireCommand(event, commandName, callback);
};
