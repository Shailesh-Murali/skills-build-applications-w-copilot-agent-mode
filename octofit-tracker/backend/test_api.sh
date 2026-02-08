#!/bin/bash

# OctoFit Tracker API Test Script
# This script tests all API endpoints

# Get the codespace name or use localhost
if [ -n "$CODESPACE_NAME" ]; then
    BASE_URL="https://${CODESPACE_NAME}-8000.app.github.dev"
    echo "Testing on Codespace: $BASE_URL"
else
    BASE_URL="http://localhost:8000"
    echo "Testing on localhost: $BASE_URL"
fi

echo "================================"
echo "OctoFit Tracker API Tests"
echo "================================"
echo ""

# Test Users endpoint
echo "1. Testing /api/users/"
curl -s -o /dev/null -w "Status: %{http_code}\n" "${BASE_URL}/api/users/"
curl -s "${BASE_URL}/api/users/" | python3 -m json.tool | head -20
echo ""

# Test Teams endpoint
echo "2. Testing /api/teams/"
curl -s -o /dev/null -w "Status: %{http_code}\n" "${BASE_URL}/api/teams/"
curl -s "${BASE_URL}/api/teams/" | python3 -m json.tool | head -20
echo ""

# Test Activities endpoint
echo "3. Testing /api/activities/"
curl -s -o /dev/null -w "Status: %{http_code}\n" "${BASE_URL}/api/activities/"
curl -s "${BASE_URL}/api/activities/" | python3 -m json.tool | head -20
echo ""

# Test Leaderboards endpoint
echo "4. Testing /api/leaderboards/"
curl -s -o /dev/null -w "Status: %{http_code}\n" "${BASE_URL}/api/leaderboards/"
curl -s "${BASE_URL}/api/leaderboards/" | python3 -m json.tool | head -20
echo ""

# Test Workouts endpoint
echo "5. Testing /api/workouts/"
curl -s -o /dev/null -w "Status: %{http_code}\n" "${BASE_URL}/api/workouts/"
curl -s "${BASE_URL}/api/workouts/" | python3 -m json.tool | head -20
echo ""

# Test URL response endpoint for activities
echo "6. Testing /api/url/activities/"
curl -s "${BASE_URL}/api/url/activities/" | python3 -m json.tool
echo ""

echo "================================"
echo "Tests Complete!"
echo "================================"
