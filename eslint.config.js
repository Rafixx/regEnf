import neostandard from 'neostandard'

export default [
  ...neostandard({ ignores: ['dist/**'] }),
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      // Conflicts with @stylistic/indent on JSX ternaries (circular fixes)
      '@stylistic/jsx-indent': 'off'
    }
  }
]
