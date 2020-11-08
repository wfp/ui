module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/git',
    [
      'semantic-release-ado',
      {
        //"varName": "version",
        setOnlyOnRelease: false,
      },
    ],
    /*[
      '@semantic-release/exec',
      {
        prepareCmd: './my-build-script.sh ${nextRelease.version}',
      },
    ],*/
  ],

  release: {
    branches: ['master', 'next'],
  },
};
