#!/bin/bash

echo "🚀 Running Moonrider Dashboard Tests"
echo "====================================="

# Function to run frontend tests
run_frontend_tests() {
    echo "📱 Running Frontend Tests..."
    cd src
    npm test -- --coverage --watchAll=false
    if [ $? -eq 0 ]; then
        echo "✅ Frontend tests passed!"
    else
        echo "❌ Frontend tests failed!"
        exit 1
    fi
}

# Function to run backend tests
run_backend_tests() {
    echo "🔧 Running Backend Tests..."
    cd backend
    npm test -- --coverage --watchAll=false
    if [ $? -eq 0 ]; then
        echo "✅ Backend tests passed!"
    else
        echo "❌ Backend tests failed!"
        exit 1
    fi
}

# Check if arguments are provided
if [ $# -eq 0 ]; then
    echo "Running all tests..."
    run_frontend_tests
    run_backend_tests
elif [ "$1" = "frontend" ]; then
    run_frontend_tests
elif [ "$1" = "backend" ]; then
    run_backend_tests
else
    echo "Usage: $0 [frontend|backend]"
    echo "  No arguments: Run all tests"
    echo "  frontend: Run only frontend tests"
    echo "  backend: Run only backend tests"
    exit 1
fi

echo "🎉 All tests completed successfully!"
