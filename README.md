# Connected Dementia Research

- [Introduction](#introduction)
- [Technologies used in the project](#technologies-used-in-the-project)
- [Installation](#installation)
	- [Prerequisites](#prerequisites)
	- [Setting up and building the project](#setting-up-and-building-the-project)
- [Project structure](#project-structure)
	- [Git repository](#git-repository)
		- [Git workflow for new features](#git-workflow-for-new-features)
	- [Top-level file structure](#top-level-file-structure)
	- [Source code directory file structure](#source-code-directory-file-structure)
- [Appendices](#appendices)
	- [TODO](#todo)
	- [Lessons learned](#lessons-learned)

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

### Setting up and building the project

Run the following commands to set up the project:

1. `git clone https://github.com/chrisplatts01/connected-dementia-research.git`: Clone the repository form **Github**.
2. `cd connected-dementia-research` : Change to the working directory.
3. `yarn install`: Install the required **NodeJS** packages and their dependencies.
4. `gulp`: Run the default task to build the application and open the start page in your default browser on port 3000.

## Project structure

### Git repository

The git repository contains the following branches:

- **master**: The stable branch containing the current build-ready and deployable code.
- **develop**: The branch containing the code integrating features which have completed development but are not yet fully tested.
- **feature/FEATURE_NAME**: A temporary feature branch containing code for a feature currently under development, but not yet integrated.
- **dist**: A `git subtree` branch existing only in the **Github** repository and containing only the currently deployable `dist/` directory. Used to `git pull` the latest build to the test server.

To ensure the `master` branch is always deployable always work in the `develop` branch (for minor changes) or feature branches for developing new features.

#### Git workflow for new features

Features branches are managed by the **[git-flow](https://jeffkreeftmeijer.com/git-flow/)** workflow.

```sh
git checkout develop                    # If not already the current branch
git flow feature start FEATURE_NAME     # Create and checkout the feature branch

...                                     # Make changes, add, commit, etc

git flow feature finish FEATURE_NAME    # Merge feature branch into develop,
                                        # checkout develop branch and delete
                                        # feature branch
```

**git-flow** manages release branches and hotfix branches in a similar way, managing merges with `develop` and `master` where appropriate. See the [**git-flow** documentation](https://jeffkreeftmeijer.com/git-flow/) for further information.


### Top-level file structure

```sh
app/                                    # Source files
dist/                                   # Generated web pages
node_modules/                           # NodeJS package repository
Gulpfile.js                             # Gulp task runner configuration
package.json                            # NodeJS package configuration
README.md                               # Project README file
webpack.config.js                       # Webpack Javascript bundler configuration
yarn-error.log                          # Yarn package manager error log
yarn.lock                               # Yarn package manager lockfile
```

- **app/**: This directory is under version control and contains all of the source files required to build the production web pages, except for the **NodeJS** packages managed by **Yarn**.

- **dist/**: This directory contains the built web application (HTML,CSS, Javascript and other assets) ready for deployment to the development or production server. _(Ideally, this would not be under version control as it is recreated every time the application is rebuilt, resulting in large commits.)_

- **node_modules/**: This directory contains the **NodeJS** packages and dependencies defined in the `package.json` file. As it is completely managed by **Yarn**, and can be reinstalled and updated at any time, it is not under version control.

- **Gulpfile.js** This file contains the configuration for all of the **Gulp** tasks.

- **package.json**: This file contains the configuration for the **NodeJS** packages that are required by the project, along with metadata about the project. It also defines aliases for some simple command line tasks.

- **README.md**: The project README file _(This file!)_.

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

- **data/**: JSON files that contain content to populate the Nunjucks templates.
- **fonts/**: Fonts installed in addition to the standard system fonts in the form of `.oft`, `.ttf`, `.woff`, `.woff2`, and `.svg` files to provide compatibilty with the majority of browsers. The build process copies this directory directly to the `dist/` directory.
- **images/**: Image assets in the preferred formats of `.svg` and `.png` files. The build process copies this directory directly to the `dist/` directory.
	- **favicons/**: Favicon files in formats compatible with various devices.
- **pages/**: Nunjucks page templates. The build process compiles these to form the HTML pages in the `dist/` directory.
	-  **pattern-library/**: Pages that illustrate examples and code for every component, module and swatch.
	-  **volunteer/**: The web application page designs. _(This should be renamed to something more descriptive or, alternatively, each section of the application should be in a separate directory - for instance '`volunteer/`', '`dashboard/`', etc.)_
- **scripts/**: This folder contains the main starting point for the build process which bundles all of the Javascript dependencies into a single file and copies it to the `dist/` directory.
	- **vendor/**: Javascript libraries aand other dependencies not managed as NodeJS packages.
- **styles/**: This directory contains the main SASS (SCSS) file which is compiled to the main CSS stylesheet by the build process and copied to the `dist/` directory.
	- **mixins/**: SASS mixins
	- **partials**: Other SASS partials
- **templates/**: Nunjucks layouts, partials and macros called, included or extended by the Nunjucks page templates.
	- **components/**: Reusable template files (Nunjucks, styles and scripts) defining each component type.
	- **macros/**: Nunjucks macros called by other template files.
	- **modules/**: Larger template partials built from components which can be included in the page templates (for instance the page header and footer sections).
	- **partials/**: Other template partials which can be included in the page templates (for instance the `<head>` and `<script>` sections common to every page.)
	- **swatches/**: Non-component template partials to illustrate the brand fonts and colours in the pattern library.

## Appendices

### TODO

1. Complete design work as required, including developing any new components needed by the designs.
2. Rename directories and files called _volunteer_ to something more descriptive.
3. Add further code optimisations - primarily minimising Javascript and styesheet files for the production environment.
4. Where possible, replace Javascript library code in the `scripts/vendor` directory with **NodeJS** packages.
5. Refactor the Javascript code by moving component-specific functions from `main.js` into the `templates/components/COMPONENT_NAME` directory.

### Lessons learned

For future projects:

1. Look into using **Webpack**  as a complete replacement for **Gulp** as it handles much of the Javascript optimisation without configuration, and is increasingly capable for handling other tasks, such as SASS compilation.
2. Look into using the VueJS framework as it brings much of the required functionality (templating, optimisation, build, etc) out of the box.
