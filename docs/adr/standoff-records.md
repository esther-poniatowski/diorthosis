---
tags:
  - decision
index: "[Architecture decisions](docs/adr/_index.md)"
aliases:
  - Standoff records
status: accepted
---
# Standoff records

> [!QUESTION] Goal: where is a review item stored?

A review item is written by several contributors and read beside the reviewed files. Agents and scripts also process the item. The file holding the item determines three properties of the design:

- whether a reviewed file must change;
- how an item spanning several files is stored;
- how other files name the item.

## Decision

Each review item is one YAML file, stored apart from the reviewed files, as the specification of [review records](../features/review-records.md) details.

## Constraints

- **Untouched targets**: the requirement on [untouched targets](../requirements.md#^untouched-targets) excludes any storage inside a reviewed file. When a YAML record is validated by a schema that rejects undeclared keys, no item can be added to its data.
- **Any grain**: the requirement on [any grain](../requirements.md#^any-grain) calls for items spanning several files.
- **Stable identifier**: the requirement on a [stable identifier](../requirements.md#^stable-identifier) calls for an item nameable from a task list, a note or a commit message.
- **Plain records**: the requirement on [plain records](../requirements.md#^plain-records) calls for a file edited without the plugin, by several contributors at once.

## Options weighed

| Option | Benefit | Cost |
| --- | --- | --- |
| Markup inside the reviewed file, such as CriticMarkup or hidden HTML comments | The item moves with its text, and stays visible without a plugin | Every reviewed file changes, a YAML record breaks its schema, and an item cannot span several files |
| One sidecar file per reviewed file, as in the Markdown Review Sidecar Format | Reviewed files stay unchanged, and a standard format exists | An item spanning several files belongs to no single sidecar, and a link cannot name one item inside a sidecar |
| One register per folder, holding every item of the folder | Few files | Concurrent contributors edit the same file, and a link cannot name one item inside the register |
| One file per item | Reviewed files stay unchanged, an item spans any set of files, a link to the file names the item, and concurrent contributors edit different files | Many small files, and no item is visible without the plugin |

## Consequences

- When an item is closed, its file is deleted, so the history of the closed item remains in version control only.
- A reviewed file shows no trace of its items without the plugin. The vault view and the records themselves are then the only means of finding the open items.
- The plugin must locate the scope of each item without an anchor in the target, as the decision on [text selectors](text-selectors.md) records.
