<!-- @format -->

# Real-Time Tracking Application

This is a real-time tracking application built using React and the Google Maps API. It allows drivers to track their progress along a predefined route, showing the estimated time to reach each upcoming stop.

## Technologies Used

-   React
-   Vite
-   Tailwindcss
-   Google Maps API
-   @vis.gl/react-google-maps

## Setting Up Google Cloud Console

Before running the application, you need to set up the required APIs in the Google Cloud Console:

1. Go to [Google Cloud Console](https://console.cloud.google.com/).

2. Enable the following APIs:
    - Directions API
    - Maps JavaScript API
    - Route API

![Google Cloud APIs](google-cloud-apis.png)

## Setting Up Locally

To set up the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/gracebir/realtime-ride-share-track-app
    ```
2. Navigate to the project directory:

    ```bash
    cd realtime-ride-share-track-app
    ```

3. Install dependencies:
    ```bash
    npm install
    ```
4. Create a .env file in the root directory and add your Google Maps API key:

    ```bash
    VITE_API_KEY=your_api_key
    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

## Video Demo

Check out this video demo for a walkthrough of the application.
