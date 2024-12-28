# Use an official Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the necessary files to install dependencies
COPY package*.json ./

# Install ALL dependencies (development and production)
RUN npm install

# Copy the rest of the code to the container
COPY . .

# Build the NestJS application
RUN npm run build

# Clean up development dependencies and reinstall only production dependencies
RUN npm prune --production

# Expose the application port
EXPOSE 3000

# Define the command to start the application in production mode
CMD ["npm", "run", "start:prod"]
