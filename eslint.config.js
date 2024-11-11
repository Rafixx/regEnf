import globals from "globals";
import pluginReact from "eslint-plugin-react";


export default [
  {
    // Archivos que ESLint analizará
    files: ['**/*.{js,mjs,cjs,jsx}'],
    
    // Opciones del lenguaje, incluyendo las variables globales
    languageOptions: {
      ecmaVersion: 'latest',  // La versión más reciente de ECMAScript
      sourceType: 'module',  // Usamos módulos de ES (import/export)
      globals: globals.browser,  // Incluye variables globales del entorno del navegador
    },

    // Extensiones y configuraciones del plugin de React
    plugins: {
      react: pluginReact,
    },

    // Configuraciones recomendadas y reglas
    rules: {
      // Aquí definimos nuestras reglas personalizadas
      'react/react-in-jsx-scope': 'off',  // No necesitamos React en el scope (React 17+)
      'react/prop-types': 'off',  // Desactivamos prop-types (si no las usas)
      indent: ['error', 2],  // Reglas de indentación a 2 espacios
      quotes: ['error', 'single'],  // Usar comillas simples
      semi: ['error', 'always'],  // Siempre usar punto y coma
    },
  },
  // Otras configuraciones o archivos pueden ser añadidos como más objetos en este array
];
