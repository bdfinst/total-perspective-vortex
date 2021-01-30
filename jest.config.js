module.exports = async () => {
  return {
    verbose: true,
    bail: 1,
    rootDir: './',
    moduleFileExtensions: ['js', 'svelte'],
    transform: {
      '^.+\\.js$': 'babel-jest',
      '^.+\\.svelte$': 'svelte-jester',
    },
  }
}
