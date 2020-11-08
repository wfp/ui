module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git',
    [
      'semantic-release-ado',
      {
        varName: 'nextRelease',
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
    branches: ['master', 'next', 'feat/sprint-6-minors'],
  },
};
