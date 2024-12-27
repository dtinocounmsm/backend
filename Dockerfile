# Use an official Node.js base image
FROM node:18

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy the files needed to install dependencies
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (development and production)
RUN pnpm install

# Copy the rest of the code to the container
COPY . .

# Build the NestJS application
RUN pnpm build

# Clean up development dependencies and keep only production ones
RUN pnpm prune --prod

# Expose the application port
EXPOSE 3000

# Define the command to start the application in production mode
CMD ["node", "dist/main"]
