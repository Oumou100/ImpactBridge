process.env.NODE_ENV = "test";
process.env.PORT = "4001";
process.env.API_PREFIX = "/v1";
process.env.CORS_ORIGIN = "http://localhost:3000";
process.env.DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/impactbridge_test";
process.env.JWT_ACCESS_SECRET = "test_access_secret_123456";
process.env.JWT_REFRESH_SECRET = "test_refresh_secret_123456";
process.env.JWT_ACCESS_EXPIRES_IN = "15m";
process.env.JWT_REFRESH_EXPIRES_IN = "7d";

