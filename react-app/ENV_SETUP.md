# Environment Configuration

This project uses environment variables for configuration. Follow these steps to set up your environment.

## Setup Instructions

1. **Create `.env` file** in the `react-app` directory (if it doesn't exist):
   ```bash
   cd react-app
   ```

2. **Copy the example file** (if needed):
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env` file** with your configuration:
   ```env
   # API Configuration
   REACT_APP_API_BASE_URL=http://localhost:5000
   REACT_APP_SOCKET_URL=http://localhost:5000

   # App Configuration
   REACT_APP_APP_NAME=Exchange Ease
   REACT_APP_APP_VERSION=1.0.0

   # Toast Configuration
   REACT_APP_TOAST_AUTO_CLOSE=3000
   REACT_APP_TOAST_POSITION=top-right
   ```

## Environment Variables

### API Configuration
- `REACT_APP_API_BASE_URL`: Base URL for your backend API (default: `http://localhost:5000`)
- `REACT_APP_SOCKET_URL`: WebSocket/Socket.IO server URL (default: `http://localhost:5000`)

### App Configuration
- `REACT_APP_APP_NAME`: Application name (default: `Exchange Ease`)
- `REACT_APP_APP_VERSION`: Application version (default: `1.0.0`)

### Toast Configuration
- `REACT_APP_TOAST_AUTO_CLOSE`: Auto-close time for toast notifications in milliseconds (default: `3000`)
- `REACT_APP_TOAST_POSITION`: Position of toast notifications (default: `top-right`)

## Production Setup

For production, update the `.env` file with your production URLs:

```env
REACT_APP_API_BASE_URL=https://api.yourapp.com
REACT_APP_SOCKET_URL=https://api.yourapp.com
```

## Important Notes

1. **All environment variables must start with `REACT_APP_`** for Create React App to recognize them.
2. **Restart the development server** after changing environment variables.
3. **Never commit `.env` file** to version control (it's already in `.gitignore`).
4. **Use `.env.example`** as a template for other developers.

## Using the Configuration

All API endpoints and configuration are centralized in `src/config/api.js`. Import and use them like this:

```javascript
import { API_ENDPOINTS, getImageUrl, SOCKET_CONFIG } from '../config/api';

// Use API endpoints
const url = API_ENDPOINTS.GET_PRODUCTS;
const productUrl = API_ENDPOINTS.GET_PRODUCT_BY_ID(productId);

// Get image URL
const imageUrl = getImageUrl(imagePath);

// Socket connection
const socket = io(SOCKET_CONFIG.URL, SOCKET_CONFIG.OPTIONS);
```

