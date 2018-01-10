# serverless-cqrs
Sample CQRS example using AWS Lambda 

## Installation
```bash
 brew bundle
 npm install -g serverless
 serverless login
 open https://serverless.com/framework/docs/providers/aws/guide/credentials/
 aws configure
```
Note:
* We're working on a toolchain to automate the setup process.
* Key generation will still be a manual process

## Deploy
```bash
serverless deploy
```

## Test
```bash
serverless invoke -f hello -l -d '{"key": "value"}'
```
