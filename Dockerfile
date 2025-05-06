# Use the latest Node LTS (or current) version
FROM node:current

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./
COPY index.js ./

# Install dependencies
RUN npm install

# Expose the port your app runs on
EXPOSE 3002

# Start the app
CMD ["npm", "start"]