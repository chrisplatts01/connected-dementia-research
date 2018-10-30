# Connected Dementia Research

- [Introduction](#introduction)
- [Technologies used in the project](#technologies-used-in-the-project)
- [Installation](#installation)
	- [Prerequisites](#prerequisites)
- [Project structure](#project-structure)
	- [Git repository](#git-repository)
	- [Top-level file structure](#top-level-file-structure)
	- [Source code file structure](#source-code-file-structure)

## Introduction

This document will provide developers and maintainers with instructions on installing, building and deploying the application; an overview of the technologies used in the project; and descriptions of the project's file structure.

## Technologies used in the project

- **[Github](https://github.com)**: A service providing remote hosting and management of **git** repositories.

- **[NodeJS](https://nodejs.org)**: A Javascript command line environment for developing applications that can run outside of a browser environment.

- **[Yarn](https://yarnpkg.com/lang/en/)**: A package manager for **NodeJS** packages with secure and reliable dependency management.

- **[Gulp](https://gulpjs.com)**: A task runner using **NodeJS** modules to accomplish a given task.

- **[Webpack](https://webpack.js.org)**: A static module bundler for JavaScript applications[^webpack].

- **[Nunjucks](https://mozilla.github.io/nunjucks/)**: A front-end templating language using Handlebars-style syntax. It is a NodeJS port of the Python-based **Jinja2**.

## Installation

### Prerequisites

- git: See [Git - Downloads](https://git-scm.com/downloads) for installation information[^pm].
- NodeJS
- Yarn
- Gulp
- Webpack

## Project structure

### Git repository

The git repository contains the following branches:

- **master**: The stable branch containing the current build-ready and deployable code.
- **develop**: The branch containing the code integrating features which have completed development but are not yet fully tested.
- **feature/FEATURE_NAME**: A feature branch containing code for a feature currently under development, but not yet integrated.
- **dist**: A subtree branch containing only the currently deployable `dist/` folder[^dist].

Features branches are managed by the **[git-flow](https://jeffkreeftmeijer.com/git-flow/)** workflow.

### Top-level file structure

```
app/			# Source files
dist/			# Generated web pages
node_modules/		# NodeJS packages
Gulpfile.js		# Task runner configuration
package.json		# NodeJS package configuration
DOCUMENTATION.md	# This documentation file
README.md		# Project README file
server.js		# ????
webpack.config.js	# Javascript bundler configuration
yarn-error.log		# Package manager error log
yarn.lock		# Package manager lockfile
```

- **app/**: This folder is under version control and contains all of the source files required to build the production web pages, except for the `NodeJS` packages managed by `yarn`.

- **dist/**: This folder contains the built web application (HTML,CSS, Javascript and other assets) ready for deployment to the development or production server[^dist].

- **node_modules/**: This folder contains the **NodeJS** packages and dependencies defined in the `package.json` file. As it is completely managed by **Yarn**, and can be reinstalled and updated at any time, it is not under version control.

- **Gulpfile.js** This file contains the configuration for all of the **Gulp** tasks.

- **package.json**: This file contains the configuration for the **NodeJS** packages that are required by the project, along with metadata about the project. It also defines aliases for some simple command line tasks.

- **DOCUMENTATION.md** and **DOCUMENTATION.pdf**: The **Markdown** source of this file and its current **PDF** version.

- **README.md**: The project README file.

- **webpack.config.js**: The **Webpack** configuration file.

- **yarn.error.log**: The error log from running **Yarn** commands.

- **yarn.lock**: The **Yarn** lockfile storing the current state of the **NodeJS** packages and dependencies.

### Source code file structure

```
app/
    data/
        *.json
    fonts/
        *.otf
    images/
        favicons/
            *.svg
            *.png
            *.ico
        *.svg
        *.png
    pages/
        pattern-library/
            *.njk
        volunteers/
            *.njk
        index.njk
    scripts/
		    vendor
    styles/
    templates/
```

[^webpack]:

  While **Gulp** and **Webpack** work in fundamentally different ways, each can accomplish many of the same tasks, but the bundling of Javascript files is more robust with **Webpack**. However configuration beyond bundling Javascript is less intuitive/more complex so I am currently running a simple instance of **Webpack** as part of the `scripts` task within **Gulp**.

[^pm]:

  Or use a package manager such as [Homebrew](https://brew.sh) or [APT](https://wiki.debian.org/Apt)

[^dist]:

  Ideally this folder should not be under version control as it is completely replaced on every build, resulting in large commits every time, but until I have fully tested the `git subtree` process it will remain under version control in the master and develop branches.
