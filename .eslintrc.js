const OFF = 0;
const ERROR = 2;

module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:jest/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint', 'import', 'prettier', 'jest'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    env: {
        es6: true,
        jest: true,
        node: true,
    },
    settings: {
        'import/resolver': {
            'babel-module': {},
            typescript: {},
        },
    },
    rules: {
        quotes: OFF,
        'prettier/prettier': [
            ERROR,
            {
                useTabs: false,
                semi: true,
                singleQuote: true,
                jsxSingleQuote: false,
                trailingComma: 'all',
                arrowParens: 'always',
            },
        ],

        'no-unused-vars': OFF, // @typescript-eslint/no-unused-vars replaces this rule
        'arrow-parens': [ERROR, 'always', { requireForBlockBody: false }],
        'no-use-before-define': OFF, // @typescript-eslint/no-use-before-define replaces this rule
        'no-restricted-exports': OFF,

        'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }],
        'import/prefer-default-export': OFF,
        'import/extensions': [
            ERROR,
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],

        '@typescript-eslint/no-unused-vars': OFF, // duplicated by ts(6133)
        '@typescript-eslint/no-use-before-define': ERROR,
        '@typescript-eslint/unbound-method': ERROR,
        '@typescript-eslint/require-await': OFF, // Fastify requires async functions everywhere?
        '@typescript-eslint/ban-ts-comment': OFF,
        '@typescript-eslint/no-floating-promises': OFF,
        '@typescript-eslint/explicit-function-return-type': OFF,
        '@typescript-eslint/explicit-module-boundary-types': OFF,

        'jest/no-commented-out-tests': ERROR,
    },
    overrides: [
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/no-unsafe-call': OFF,
                '@typescript-eslint/no-unsafe-return': OFF,
                '@typescript-eslint/no-unsafe-member-access': OFF,
                '@typescript-eslint/no-var-requires': OFF,
            },
        },
        {
            files: '*.spec.tsx',
            rules: {
                '@typescript-eslint/ban-ts-comment': OFF,
            },
        },
    ],
};
