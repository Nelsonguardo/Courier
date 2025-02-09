#!/bin/bash

# Define the .env file path
ENV_FILE=".env"

# Create the .env file and add some default environment variables
cat <<EOL > $ENV_FILE
# Environment Variables
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=admin
DB_NAME_DEV=courierdev
DB_NAME_TEST=couriertest
DB_NAME_PROD=courier
DB_PORT=3306
PORT=3000
ENVIROMENT=$1
EOL

echo ".env file created successfully."