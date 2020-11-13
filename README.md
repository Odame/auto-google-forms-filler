# Auto-Google-Form-Filling

A very simple desktop application for automatically filling (and/or generating data for) a
google form.

Basically, this application generates random data and uses a selenium driver to input data into a google form and submit.

At the moment, it is built for specific google form; support for generic google forms is coming soon.

<hr />

This project was bootstrapped from:

<img src="internals/img/erb-banner.png" width="100%" />

<br>

<p>
  Electron React Boilerplate uses <a href="https://electron.atom.io/">Electron</a>, <a href="https://facebook.github.io/react/">React</a>, <a href="https://github.com/reactjs/redux">Redux</a>, <a href="https://github.com/reactjs/react-router">React Router</a>, <a href="https://webpack.github.io/docs/">Webpack</a> and <a href="https://github.com/gaearon/react-hot-loader">React Hot Loader</a> for rapid application development (HMR).
</p>

<hr />

<div align="center">

[![Build Status][github-actions-status]][github-actions-url]
[![Github Tag][github-tag-image]][github-tag-url]

</div>

## Features

- [ ] Generate data for google form

- [ ] Specify number of data samples to be generated

- [ ] Preview generated data before submission

- [ ] Pre-edit generated data before submission

- [ ] Run in headless mode

## Starting Development

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
yarn start
```

## Packaging for Production

To package apps for the local platform:

```bash
yarn package
```

## Development Docs

See Electron React Boilerplate's [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation) for more info.

## Maintainers

- [Prince Odame](https://princeodame.com)

## License

MIT © [Prince Odame](https://github.com/Odame)

[github-actions-status]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/workflows/Test/badge.svg
[github-actions-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/actions
[github-tag-image]: https://img.shields.io/github/tag/electron-react-boilerplate/electron-react-boilerplate.svg?label=version
[github-tag-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/releases/latest
