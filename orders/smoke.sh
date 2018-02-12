#!/usr/bin/env bash

SERVICE_URL=http://localhost:3000
#SERVICE_URL=https://z18aa3rtt3.execute-api.us-east-1.amazonaws.com/dev

echo "Menu items:"
curl -H "Content-Type: application/json" ${SERVICE_URL}/menu/items
echo

echo "Events:"
curl -H "Content-Type: application/json" ${SERVICE_URL}/events
echo

echo "openOrder command:"
curl -H "Content-Type: application/json" -d '{"customerId":"42"}' ${SERVICE_URL}/orders/commands/open
echo

echo "Events:"
curl -H "Content-Type: application/json" ${SERVICE_URL}/events
echo

echo "Menu items:"
curl -H "Content-Type: application/json" ${SERVICE_URL}/menu/items
echo
