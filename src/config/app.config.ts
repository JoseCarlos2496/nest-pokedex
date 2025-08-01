export const EnvConfiguration = () => ({
    enviroment: process.env.NODE_ENV || 'development',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3001,
    defaultLimit: +process.env.DEFAULT_LIMIT || 10,
})

/**
 * 
 * MONGODB=mongodb://localhost:27017/nest-pokemon
PORT=3000
DEFAULT_LIMIT=10

 */
