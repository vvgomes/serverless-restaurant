#!/usr/bin/env bash

#SERVICE_URL=http://localhost:3000
SERVICE_URL=https://hd3r50nyf2.execute-api.us-east-1.amazonaws.com/dev

echo "Customers"
curl -H "Content-Type: application/json" ${SERVICE_URL}/customers
echo

echo "signUpCustomer command:"
curl -H "Content-Type: application/json" \
  -d '{"type":"signUpCustomer","payload":{"email":"folklover@gmail.com"}}' \
  ${SERVICE_URL}/commands
echo

sleep 3

echo "Customers"
curl -H "Content-Type: application/json" ${SERVICE_URL}/customers
echo
