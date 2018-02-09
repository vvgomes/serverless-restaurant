#!/usr/bin/env bash

SERVICE_URL=http://localhost:3000
#SERVICE_URL=https://iogp4388nc.execute-api.us-east-1.amazonaws.com/dev

echo "Menu items:"
curl -H "Content-Type: application/json" ${SERVICE_URL}/menu/items
echo

echo "Events:"
curl -H "Content-Type: application/json" ${SERVICE_URL}/events
echo

echo "addMenuItem command:"
curl -H "Content-Type: application/json" -d '{"description":"peperoni", "price":10.0}' ${SERVICE_URL}/menu/items/commands/add
echo

echo "Events:"
curl -H "Content-Type: application/json" ${SERVICE_URL}/events
echo

echo "Menu items:"
curl -H "Content-Type: application/json" ${SERVICE_URL}/menu/items
echo
