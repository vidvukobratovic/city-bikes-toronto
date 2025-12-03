#!/bin/bash
# Simple script to run the backend

echo "Building and running City Bikes Backend..."
stack build && stack exec city-bikes-backend

