<h1 align="center">PrayForMe.fyi: Community Prayer Platform</h1>

<div align="center">
    <strong>Need prayer? Let us know. Want to pray for others? Join our community.</strong>
</div>

## About

PrayForMe.fyi is a community-driven platform that connects those in need of prayer with individuals willing to offer support. Our mission is to create a space where people can share their prayer requests and engage in meaningful, supportive interactions.

## Technologies Used

- **Next.js**: A React framework for building high-performance web applications with server-side rendering and static site generation.
- **Vercel**: A cloud platform for static sites and Serverless Functions, optimized for Next.js deployments.
- **OpenAI**: Leveraging AI capabilities to enhance the prayer experience and provide intelligent interactions.
- **Hono**: A small, simple, and ultrafast web framework for building modern web applications. Used for our API server.

## Project Structure

This repository contains the frontend application. The API server is built with Hono and can be found in a separate repository:

[PrayForMe Hono Server](https://github.com/michaelshimeles/prayforme-hono-server)

## Getting Started

### Prerequisites

- Ensure Node.js and npm (or yarn) are installed on your machine.
- Obtain API keys from OpenAI.

### API Keys Required

To run this project, you'll need to set up the following environment variables:

```
OPENAI_API_KEY=
BEARER_TOKEN=
```

### Installation

1. Clone the repository:
    ```
    git clone https://github.com/yourusername/prayforme-fyi.git
    ```
2. Install the required dependencies:
    ```
    npm install
    ```
    or
    ```
    yarn install
    ```
3. Create a `.env.local` file in the root of your project and add your API keys as listed above.

### Running the Server

To start the development server, execute:
```
npm run dev
```
or
```
yarn dev
```

Navigate to `http://localhost:3000` to view the application.

## API Server

The API server for PrayForMe.fyi is built using Hono, a lightweight and fast web framework. To set up and run the API server, please refer to the [PrayForMe Hono Server repository](https://github.com/michaelshimeles/prayforme-hono-server).

## Contributing

We welcome contributions to PrayForMe.fyi! If you have suggestions for improvements or encounter any issues, please feel free to open an issue or submit a pull request in either the frontend or API server repository.

## License

This project is licensed under the MIT License.

## Support

If you need assistance or have any questions, please open an issue in the GitHub repository or reach out to me on Twitter at @rasmickyy.

Thank you for your interest in PrayForMe.fyi. Together, we can create a supportive community of prayer and encouragement.
