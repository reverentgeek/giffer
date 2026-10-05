# Giffer

This is an [Electron.js](https://electronjs.org/) demo application for [Cross-Platform Desktop Apps with Electron](https://speakerdeck.com/reverentgeek/oracle-code-one-2019-cross-platform-desktop-apps-with-electron). Use it to search for that perfect reaction gif!

This demo also uses [Vue.js](https://vuejs.org/) and [Bulma](https://bulma.io/).

## About Me

Website: [reverentgeek.com](https://reverentgeek.com) | Twitter: [@reverentgeek](https://twitter.com/reverentgeek)

## Development Setup

* Download and install [Node.js](https://nodejs.org)
* Install [pnpm](https://pnpm.io/installation)
* Clone this repository
* Run `pnpm install`
* Start application using `pnpm start`

The app uses a public beta [GIPHY API](https://developers.giphy.com/) key that is rate limited. If searches start failing, create your own key and replace `apiKey` in `app.js`.

## Build a Stand-alone App

* Complete the development setup steps above
* Run `pnpm package`

The electron packager will build an application based on your current OS and place it in the `builds` folder.
