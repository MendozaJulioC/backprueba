module.exports = {
    apps: [
      {
        name: 'app-dev',
        script: 'src/index.js',
        watch: true,
        exec_mode: 'fork',
        // watch: ['src'],  // Solo observa cambios en la carpeta 'src'
        ignore_watch: ['node_modules', 'logs'],  // Ignora estas carpetas
        instances: 1,  // Puedes cambiar el número de instancias si quieres
        env: {
          NODE_ENV: 'development',
          PORT: 9000
        }
      },
      {
        name: 'app-prod',
        script: 'src/index.js',
        exec_mode: 'fork',
        instances: 1, // Usará todos los núcleos disponibles del CPU
        env: {
          NODE_ENV: 'production',
          PORT: 9001
        }
      }
    ]
  };
  