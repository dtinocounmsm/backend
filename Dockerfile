# Use an official Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy only the files needed to install dependencies
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the code to the container
COPY . .

# Expose the application port
EXPOSE 3000

# Build the application
RUN npm run build

# Define the command to start the application
CMD ["npm", "run", "start:prod"]
