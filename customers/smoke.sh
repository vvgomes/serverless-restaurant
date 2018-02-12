#!/usr/bin/env bash

SERVICE_URL=http://localhost:3000
#SERVICE_URL=https://xsc5klznr7.execute-api.us-east-1.amazonaws.com/dev

echo "Customers"
curl -H "Content-Type: application/json" ${SERVICE_URL}/customers
echo

echo "signUpCustomer command:"
curl -H "Content-Type: application/json" -d '{"email":"folklover@gmail.com"}' ${SERVICE_URL}/customers/commands/signup
echo

sleep 3

echo "Customers"
curl -H "Content-Type: application/json" ${SERVICE_URL}/customers
echo
