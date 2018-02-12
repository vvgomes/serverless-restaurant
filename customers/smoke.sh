#!/usr/bin/env bash

SERVICE_URL=http://localhost:3000
#SERVICE_URL=https://ommtjxahsg.execute-api.us-east-1.amazonaws.com/dev

echo "Customers"
curl -H "Content-Type: application/json" ${SERVICE_URL}/customers
echo

echo "Events:"
curl -H "Content-Type: application/json" ${SERVICE_URL}/events
echo

echo "signUpCustomer command:"
curl -H "Content-Type: application/json" -d '{"email":"folklover@gmail.com"}' ${SERVICE_URL}/customers/commands/signup
echo

echo "Events:"
curl -H "Content-Type: application/json" ${SERVICE_URL}/events
echo

echo "Customers"
curl -H "Content-Type: application/json" ${SERVICE_URL}/customers
echo
