# Gatsbyjs - Minimal, Simple Blog

## Getting started

### Install and start locally:

```shell
gatsby new gatsby-minimal-simple-blog https://github.com/antranapp/gatsby-minimal-simple-blog
```

### Deploy to Github Pages

**Step 1**

Start by pushing a gh-pages branch. The initial contents of the branch doesn't matter since it will be overridden with the build artifacts on the next step of this guide.

```shell
git checkout -b gh-pages
git push -u origin gh-pages
```

**Step 2**

In `gatsby-config.js`, change the `pathPrefix` to the name of your Github repository

```javascript
module.exports = {
  pathPrefix: `/gatsby-minimal-simple-blog`,
  ...
}
```

**Step 3**

```shell
npm run deploy
```

If everything goes well, you should be able to access [the page](https://antranapp.github.io/gatsby-minimal-simple-blog/)