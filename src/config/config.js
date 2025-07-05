// config.js - Frontend Environment Configuration
const config = {
    development: {
      apiUrl: 'http://localhost:8000',
      environment: 'development',
      debug: true
    },
    production: {
      apiUrl: 'https://shuny-backend.onrender.com',
      environment: 'production',
      debug: false
    }
  };
  
  // Auto-detect environment
  const getEnvironment = () => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      // Browser environment - check hostname
      const hostname = window.location.hostname;
      
      // Local development detection
      if (hostname === 'localhost' || 
          hostname === '127.0.0.1' || 
          hostname.includes('localhost') ||
          hostname.includes('192.168.') ||
          hostname.includes('10.0.') ||
          hostname.includes('172.')) {
        return 'development';
      }
      
      // Production detection
      if (hostname.includes('shuny.in')) {
        return 'production';
      }
      
      // Default to development for unknown environments
      return 'development';
    }
    
    // Node.js environment (for SSR/build processes)
    const nodeEnv = process.env.NODE_ENV || 'development';
    return nodeEnv === 'production' ? 'production' : 'development';
  };
  
  const currentEnv = getEnvironment();
  const currentConfig = config[currentEnv];
  
  // Log current environment (only in development)
  if (currentConfig.debug) {
    console.log(`🌍 Environment: ${currentConfig.environment}`);
    console.log(`🔗 API URL: ${currentConfig.apiUrl}`);
  }
  
  export default currentConfig;
  export { config, getEnvironment };