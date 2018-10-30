# Connected Dementia Research

- [Introduction](#introduction)
- [Technologies used in the project](#technologies-used-in-the-project)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Setting up the project](#setting-up-the-project)
- [Project structure](#project-structure)
  - [Git repository](#git-repository)
  - [Top-level file structure](#top-level-file-structure)
  - [Source code directory file structure](#source-code-directory-file-structure)

## Introduction

This document will provide developers and maintainers with instructions on installing, building and deploying the application; an overview of the technologies used in the project; and descriptions of the project's file structure.

## Technologies used in the project

- **[git](https://git-scm.com)**: A distributed version control system.
- **[Github](https://github.com)**: A service providing remote hosting and management of **git** repositories.
- **[NodeJS](https://nodejs.org)**: A Javascript runtime environment for developing and running applications outside of the browser.
- **[Yarn](https://yarnpkg.com/lang/en/)**: A package manager for **NodeJS** packages.
- **[Gulp](https://gulpjs.com)**: A toolkit for automating and running development workflow tasks.
- **[Webpack](https://webpack.js.org)**: A static module bundler for JavaScript applications.
- **[Nunjucks](https://mozilla.github.io/nunjucks/)**: A front-end templating language using Handlebars-style syntax.

## Installation

### Prerequisites

Ensure that the latest version of the following applications are installed:

- git: See [Git - Downloads](https://git-scm.com/downloads) for installation information.
- NodeJS: See [Downlod | NodeJS](https://nodejs.org/en/download/) for installation information.
- Yarn: See [Installation | Yarn](https://yarnpkg.com/en/docs/install#mac-stable) for installation information.
- Gulp: Run `yarn global add gulp-cli`

**git**, **NodeJS** and **Yarn** can also be installed using a package manager such as [Homebrew](https://brew.sh) or [APT](https://wiki.debian.org/Apt).

### Setting up the project

Run the following commands to set up the project:

1. `git clone https://github.com/chrisplatts01/connected-dementia-research.git`: Clone the repository form **Github**.
2. `cd connected-dementia-research` : Change to the working directory.
3. `yarn install`: Install the required **NodeJS** packages and their dependencies.
4. `gulp`: Run the default task to build the application and open the start page in your default browser.

## Project structure

### Git repository

The git repository contains the following branches:

- **master**: The stable branch containing the current build-ready and deployable code.
- **develop**: The branch containing the code integrating features which have completed development but are not yet fully tested.
- **feature/FEATURE_NAME**: A temporary feature branch containing code for a feature currently under development, but not yet integrated.
- **dist**: A subtree branch containing only the currently deployable `dist/` directory.

Features branches are managed by the **[git-flow](https://jeffkreeftmeijer.com/git-flow/)** workflow.

### Top-level file structure

```sh
app/                # Source files
dist/               # Generated web pages
node_modules/       # NodeJS packages
Gulpfile.js         # Task runner configuration
package.json        # NodeJS package configuration
DOCUMENTATION.md    # This documentation file
README.md           # Project README file
webpack.config.js   # Javascript bundler configuration
yarn-error.log      # Package manager error log
yarn.lock           # Package manager lockfile
```

- **app/**: This directory is under version control and contains all of the source files required to build the production web pages, except for the **NodeJS** packages managed by **Yarn**.

- **dist/**: This directory contains the built web application (HTML,CSS, Javascript and other assets) ready for deployment to the development or production server. _(Ideally, this would not be under version control as it is recreated every time the application is rebuilt, resulting in large commits.)_

- **node_modules/**: This directory contains the **NodeJS** packages and dependencies defined in the `package.json` file. As it is completely managed by **Yarn**, and can be reinstalled and updated at any time, it is not under version control.

- **Gulpfile.js** This file contains the configuration for all of the **Gulp** tasks.

- **package.json**: This file contains the configuration for the **NodeJS** packages that are required by the project, along with metadata about the project. It also defines aliases for some simple command line tasks.

- **DOCUMENTATION.md** and **DOCUMENTATION.pdf**: The **Markdown** source of this file and its current **PDF** version.

- **README.md**: The project README file.

- **webpack.config.js**: The **Webpack** configuration file.

- **yarn.error.log**: The error log from running **Yarn** commands.

- **yarn.lock**: The **Yarn** lockfile storing the current state of the **NodeJS** packages and dependencies.

### Source code directory file structure

```sh
app/                                    # Source code folder
    data/                               # JSON data consumed by Nunjucks templates
        *.json
    fonts/                              # Non-system web fonts
        *.otf
        *.ttf
        *.woff
    images/                             # Images files
        favicons/                       # Favicon files
            *.svg
            *.png
            *.ico
        *.svg
        *.png
    pages/                              # Nunjucks page template files
        pattern-library/                # Pattern library pages
            *.njk
        volunteers/                     # Application design pages
            *.njk
        index.njk
    scripts/                            # Javascript files
        vendor/                         # Library scripts not managed by NodeJS
            VENDOR_NAME/                # Vendor directory
                *.js
        main.js
    styles/                             # SASS stylesheets (SCSS files)
        mixins/                         # SASS mixins
            *.scss
        partials/                       # SASS partials
            *.scss
        main.scss
    templates/                          # Nunjucks layouts, components, etc
        components/                     # Nunjucks components
            COMPONENT_NAME/             # Nunjucks component files
                _COMPONENT_NAME.njk
                _COMPONENT_NAME.js
                _COMPONENT_NAME.scss
        macros/                         # Nunjucks macro files
            *.njk
        modules/                        # Nunjucks module files
            *.njk
        partials/                       # Other Nunjucks partials
            *.njk
        swatches/                       # Font and colour swatches
        pattern-library-layout.njk      # Pattern library layout file
        volunteer-layout.njk            # Web application layout file
```
