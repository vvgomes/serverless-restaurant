#!/usr/bin/env bash

SERVICE_URL=http://localhost:3000
#SERVICE_URL=https://o0yr8sx33d.execute-api.us-east-1.amazonaws.com/dev

echo "Menu items:"
curl -H "Content-Type: application/json" ${SERVICE_URL}/menu/items
echo

echo "addMenuItem command:"
curl -H "Content-Type: application/json" \
  -d '{"type":"addMenuItem","payload":{"description":"peperoni", "price":10.0}}' \
  ${SERVICE_URL}/commands
echo

sleep 3

echo "Menu items:"
curl -H "Content-Type: application/json" ${SERVICE_URL}/menu/items
echo
