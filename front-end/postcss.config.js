module.exports = {
  plugins: {
    'postcss-preset-env': {
      stage: 3, // Cambia el valor dependiendo de tus necesidades
      features: {
        'nesting-rules': true, // Habilita las reglas anidadas
      },
    },
    autoprefixer: {}, // Asegura la compatibilidad con los navegadores
  },
};