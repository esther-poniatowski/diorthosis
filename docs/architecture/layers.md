---
tags:
  - architecture
index: "[Architecture](docs/architecture/_index.md)"
aliases:
  - Layers and dependency rule
---
# Layers and dependency rule

Four layers divide the source code of diorthosis, and each layer depends only on the layers closer to the domain. The domain layer depends on no library and on no host application. Records and anchoring are computed in the domain, so unit tests can cover them outside Obsidian. From the domain outward, the four layers are the following:

| Layer | Folder | Responsibility | Admitted dependencies |
| --- | --- | --- | --- |
| Domain | `src/domain/` | Model of review records, vocabularies, identifiers, selectors, resolution of text selectors, re-anchoring, structure of a Markdown section | None |
| Application | `src/application/` | Ports, use cases (capturing an item, replying, changing a state, closing, re-anchoring, following a renamed target, listing the items), model of the settings | Domain |
| Infrastructure | `src/infrastructure/` | Port implementations that call third-party libraries or Node, such as the YAML parser that reads and writes records and resolves field paths | Domain, application |
| Adapters | `src/adapters/` | Composition root, and every module that calls the API of Obsidian or of CodeMirror, such as markers, highlights, bubbles, the vault view, commands and the settings tab | All layers |

The dependency rule is enforced by the ESLint configuration `config/tools/eslint.config.mjs`, so the lint check fails when an import breaks the rule. The same check forbids the API of Obsidian and the editor library CodeMirror in every layer except the adapters, and the YAML parser in the domain and application layers. Any other library is excluded from the domain by convention only, since no lint rule forbids such a library.

Two files of the folder `src/` lie outside the four layer folders:

- the error hierarchy `src/errors.ts`, shared by all layers;
- the entry point `src/main.ts`, exporting only the plugin class.

## Features across layers

Within each feature, the code that calls the API of Obsidian lies in the adapters layer, and the other code lies in the inner layers. Each feature is planned to split across the layers as follows:

| Feature | Domain | Application | Infrastructure | Adapters |
| --- | --- | --- | --- | --- |
| [Review records](../features/review-records.md) | Model of a record, vocabularies, identifiers, states | Port for the record store, use cases on records, model of the settings | Reading and writing of record files through the YAML parser | Watching of the records folders, settings tab |
| [Selectors](../features/selectors.md) | Resolution of text selectors and heading paths, re-anchoring, port of the approximate match | Use cases for re-anchoring and for following a renamed target | Resolution of field paths through the YAML parser, implementation of the approximate match | Reaction to the edits, renames and moves of the vault |
| [Review interface](../features/review-interface.md) | — | Use cases for capture, reply, closing and listing | — | Markers, highlights, bubbles, vault view, commands, one adapter per format |
