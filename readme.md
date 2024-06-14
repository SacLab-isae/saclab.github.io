# SacLAB Website

## Getting Started

This guide will help you set up the SacLAB website on your local machine. Follow the instructions below according to your operating system.

### Prerequisites

Ensure you have the following installed on your system:

- Git
- Node.js and npm

### Installation

#### Cloning the Project

First, clone the project from GitLab to your local machine:

```sh
git clone https://github.com/SacLab-isae/website.git
```

Navigate to the project directory:

```sh
cd website
```

#### Installing Dependencies

Install the required dependencies using npm:

```sh
npm install
```

### Running the Local Server

To view the website locally, you need to set up a local server using Node.js.

#### Start the Local Server

Run the following command to start the server:

```sh
node server.js
```

#### Open Your Browser

Navigate to the following URL to view the website:

```sh
http://localhost:3000/content/home/index.html
```

## Project Structure

Here is the folder structure:

- `content/`: Contains all the HTML files and content for different sections of the website.
- `assets/`: Includes all the static assets such as CSS files, JavaScript files, images, and fonts used throughout the website.
- `forms/`: Holds the HTML forms for user interactions such as sign-up and sign-in pages.
