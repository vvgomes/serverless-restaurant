#!/usr/bin/env bash

SERVICE_URL=http://localhost:3000
#SERVICE_URL=https://z18aa3rtt3.execute-api.us-east-1.amazonaws.com/dev

echo "Orders:"
curl -H "Content-Type: application/json" ${SERVICE_URL}/orders
echo

echo "openOrder command:"
curl -H "Content-Type: application/json" -d '{"customerId":"42"}' ${SERVICE_URL}/orders/commands/open
echo

sleep 3

echo "Orders:"
curl -H "Content-Type: application/json" ${SERVICE_URL}/orders
echo
