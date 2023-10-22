/** @type {import('semantic-release').GlobalConfig} */
export default {
  branches: ["main"],
  plugins: [
    "@semantic-release/commit-analyzer",
    {
      "preset": "angular",
      "releaseRules": [
        { "type": "style", "release": "patch" }
      ]
    }
  ],
};