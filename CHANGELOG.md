# Changelog

Every notable change to the project is recorded in this changelog. The format follows [Keep a Changelog](https://keepachangelog.com/). The version numbers follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- Documentation of the motivation, the requirements and the architecture of the plugin.
- Specifications of review records, selectors and the review interface.
- Decision records, and an assessment of existing plugins.
- Implementation plan, host interfaces of Obsidian, and a prompt starting an implementation session.
- Source tree in four layers: `domain`, `application`, `infrastructure` and `adapters`, with an empty plugin class.
- Development toolchain that builds, type-checks, lints, formats and tests the code (esbuild, tsc, ESLint, Prettier and Vitest, respectively).
- Boundaries between layers, enforced by ESLint: the libraries `obsidian` and CodeMirror are admitted in the adapters layer only.
- Example vault holding one note, one YAML record and one review record.
