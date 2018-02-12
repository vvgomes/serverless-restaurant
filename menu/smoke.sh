#!/usr/bin/env bash

SERVICE_URL=http://localhost:3000
#SERVICE_URL=https://ommtjxahsg.execute-api.us-east-1.amazonaws.com/dev

echo "Menu items:"
curl -H "Content-Type: application/json" ${SERVICE_URL}/menu/items
echo

echo "addMenuItem command:"
curl -H "Content-Type: application/json" -d '{"description":"peperoni", "price":10.0}' ${SERVICE_URL}/menu/items/commands/add
echo

sleep 3

echo "Menu items:"
curl -H "Content-Type: application/json" ${SERVICE_URL}/menu/items
echo
