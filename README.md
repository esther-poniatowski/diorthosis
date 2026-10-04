# diorthosis

[![Maintenance](https://img.shields.io/maintenance/yes/2026)]()
[![Obsidian](https://img.shields.io/badge/obsidian-%E2%89%A51.6.6-7c3aed)](https://obsidian.md/)
[![TypeScript](https://img.shields.io/badge/typescript-strict-blue)](https://www.typescriptlang.org/)
[![License: GPL](https://img.shields.io/badge/License-GPL--3.0-yellow.svg)](https://opensource.org/licenses/GPL-3.0)

Diorthosis reviews the notes and YAML records of an Obsidian vault through threaded review items, stored apart from the reviewed files and displayed beside them.

---

## Overview

Research and design projects commonly hold their arguments in notes and their specifications in YAML records. These files are typically reviewed by several contributors: the author, colleagues, and AI agents asked to propose answers. Concerns marked inline carry no author, no kind and no state, and cannot be written into a YAML record validated by a schema.

Diorthosis stores each review item as a YAML file of its own, and locates its scope in the reviewed files by selectors, so a reviewed file never changes. A marker at the anchor opens the thread of the item in a bubble beside the open file, with its scope highlighted. The motivation and the approach of the plugin are developed in the [project overview](docs/overview.md).

---

## Features

- [ ] **Review records**: each item is one YAML file, with its kind, severity, state and a thread of signed contributions, as specified for [review records](docs/features/review-records.md).
- [ ] **Selectors**: the scope of an item is located at any grain, across several files, and recovered after edits, as specified for [selectors](docs/features/selectors.md).
- [ ] **Review interface**: markers, bubbles, highlights, collapsible threads, a reply area and a vault view, as specified for the [review interface](docs/features/review-interface.md).

A feature is checked once every step labelled with that feature is checked in the [roadmap](TODO.md).

---

## Quick start

To raise a review item, a user selects a passage and runs the command *Add review item*. The command and the record format shown below belong to features still open in the [roadmap](TODO.md).

For a selection of the word "weak" in the note `notes/saturation.md`, the command writes the record `notes/_reviews/rv-p2m7.yml` below, and leaves the note unchanged:

```yaml
id: rv-p2m7
kind: term
severity: major
state: open
targets:
  - file: notes/saturation.md
    selectors:
      - type: TextQuoteSelector
        exact: weak
        prefix: 'The response saturates when the coupling is '
        suffix: '. Beyond the critical value, the response grows'
      - type: TextPositionSelector
        start: 102
        end: 106
thread:
  - author: esther-poniatowski
    timestamp: 2026-10-02T10:14:00+02:00
    body: 'State the condition on the coupling, such as $\lVert W \rVert_2 < 1$.'
```

A marker then appears before the word "weak", and a click on the marker opens the thread of the item.

---

## Documentation

| Topic | Purpose |
| --- | --- |
| [Installation](docs/guide/installation.md) | To install the plugin in a vault |
| [Features](docs/features/_index.md) | To know the format and the behaviour of each feature |
| [Requirements](docs/requirements.md) | To check a design choice against the properties required of the plugin |
| [Architecture](docs/architecture/_index.md) | To locate the module responsible for a behaviour |
| [Architecture decisions](docs/adr/_index.md) | To know which constraint fixed each design choice |

Every note of the documentation is registered in the [documentation index](docs/_index.md).

---

## Contributing

The development setup and the commit conventions are described in the [contribution guidelines](CONTRIBUTING.md).

---

## Acknowledgments

### Authors

**Author**: @esther-poniatowski

For academic use, the GitHub feature "Cite this repository" generates citations in several formats, such as APA and BibTeX, from the [citation metadata](CITATION.cff).

### Third-party dependencies

- **[Obsidian API](https://github.com/obsidianmd/obsidian-api)**: interface between the plugin and Obsidian.

The selectors follow the [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/) of the W3C.

---

## License

This project is licensed under the terms of the [GNU General Public License v3.0](LICENSE).
