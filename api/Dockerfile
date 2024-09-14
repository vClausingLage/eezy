# Use the official Node.js 20 image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# RUN npm install -g corepack yarn

# # Install corepack to manage yarn versions
# RUN corepack enable

# # Set the specific version of Yarn to 4.3.1
# RUN yarn set version stable

# # Copy the package.json and yarn.lock files to the working directory
# COPY package.json yarn.lock ./

# # Install the dependencies using yarn
# RUN yarn

# # Copy the rest of the application code to the working directory
# COPY ./dist .

# RUN sh -c "ls"

# # Expose port 4001
# EXPOSE 4001

# # Command to run the application
# CMD ["node", "app.js"]


# Install npm and copy package.json to the working directory
COPY package.json ./

# Install the dependencies using npm
RUN pnpm install

# Copy the rest of the application code to the working directory
COPY ./dist .

# Expose port 4001
EXPOSE 4041

# Command to run the application
CMD ["node", "app.js"]
