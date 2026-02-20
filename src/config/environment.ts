interface Environment {
  apiUrl: string;
  appName: string;
  appVersion: string;
  isDevelopment: boolean;
  isProduction: boolean;
  enableAnalytics: boolean;
  enableDebugTools: boolean;
  apiTimeout: number;
}

const getEnvironment = (): Environment => {
  const isDevelopment = import.meta.env.MODE === 'development';
  const isProduction = import.meta.env.MODE === 'production';

  return {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    appName: import.meta.env.VITE_APP_NAME || 'Kopano Customer Insights',
    appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
    isDevelopment,
    isProduction,
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true' || false,
    enableDebugTools: isDevelopment || import.meta.env.VITE_ENABLE_DEBUG === 'true',
    apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  };
};

export const config = getEnvironment();