# Load Tester

Load Tester is a web application built with Next.js as the frontend framework, deployed on Vercel, and an AWS Lambda and API Gateway backend. It allows you to monitor and display the results of load testing performed on target endpoints.

AWS Lambda was chosen for its built-in concurrency, which enables each request to the backend to have its own function invocation. This ensures scalability and isolation between requests, enabling efficient handling of high loads.

A live demo of the app is available here: https://app-load-testing-ag.vercel.app

This app was built for the Allan Gray Coding challenge held at UCT, which I won. 

![image](https://github.com/kafwe/http-load-tester/assets/75791207/f2980e84-1986-4f14-b042-aaaab9ca179e)

Submissions were evaluated based on functionality, code quality, performance, and usability. Creativity and extra features were also highly valued. While most submissions met the basic criteria, according to the judges, mine stood out for exceeding these criteria. They liked that I developed a cloud-based solution with a user-friendly front-end and a serverless backend, aligning well with industry trends and standards.


## Getting Started

To get started follow the steps below:

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your local machine.
- An AWS account with access to AWS Lambda and API Gateway.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/kafwe/app-load-testing-ag
cd app-load-testing-ag
```

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

3. Configure the application:

  - **Frontend Configuration**:
    Create a `.env` file in the root of the frontend directory and add the following environment variables:

```
NEXT_PUBLIC_AWS_API_GATEWAY_URL=your_aws_api_gateway_url
```

   - **Backend Configuration**:
     - Set up the AWS Lambda function and API Gateway to handle load testing requests. Deploy the Python code in the `backend` directory to the AWS Lambda function. Ensure the necessary permissions and configurations are in place. Update the AWS Lambda function code to fetch and provide load testing results to the frontend.

### Usage

To run the frontend locally, use the following command:

```bash
npm run dev
```

Access the application by navigating to `http://localhost:3000` in your web browser.
