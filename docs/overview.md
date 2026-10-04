---
tags:
  - overview
index: "[diorthosis documentation](docs/_index.md)"
aliases:
  - Project overview
---
# Project overview

Diorthosis is an Obsidian plugin that reviews the files of a vault through review items. Each item is stored as a YAML record apart from the reviewed files. The item displays beside these files, in an interface modelled on established review tools.

## Motivation

Research and design projects commonly hold their arguments in Markdown notes and their specifications in YAML records. These files are typically reviewed by several contributors: the author, colleagues, and AI agents asked to propose answers. A concern is then commonly marked inline, by a highlight or a comment carrying a keyword such as `TODO`, and each answer is written below the marker.

Four limitations are commonly observed in this practice:

- **Detached answers.** When an answer edits several sections or files, the answer has no single location below the marker, and the marker keeps no record of the edits.
- **Unattributed answers.** Neither the marker nor its answers carry an author or a date, so successive proposals cannot be distinguished.
- **Conflated concerns.** One keyword covers requests of different kinds and gravity, and carries no identifier or state, so no query can select the open concerns of one kind.
- **Broken records.** When a YAML record is validated by a schema that rejects undeclared keys, no marker can be added to its data.

No plugin in the [assessment of existing plugins](references/existing-plugins.md) reviews a YAML record, or anchors an item to content spread over several files.

## Approach

Diorthosis addresses these limitations under four design commitments.

First, each review item is one [review record](features/review-records.md), a YAML file stored apart from the reviewed files. The record holds the kind, the severity and the state of the item, and a thread of contributions, each signed and dated. A record remains a plain YAML file, so agents and scripts can edit it without the plugin.

Second, a reviewed file is never edited to hold an item. [Selectors](features/selectors.md) locate the scope of each item in the text of its targets, at [any grain](requirements.md#^any-grain). After a target is edited, the plugin recovers the scope, and lists an unrecoverable scope as an orphan.

Third, the [review interface](features/review-interface.md) is modelled on the comments of word processors and of code-review platforms. A marker at the anchor opens a bubble beside the open file, where the thread is read and answered.

Fourth, one adapter per file format resolves selectors and draws the interface. A new format needs a new adapter, and no change to the records.

## Scope

The scope of the plugin has four limits:

- Targets are text files. The Markdown adapter is implemented first, and the YAML adapter second.
- The plugin records proposals and decisions, but applies no edit to a target. A contributor edits the target, and records the edited locations in the thread.
- Records are shared between contributors through version control or a synchronization service. The plugin provides no real-time collaboration.
- Whether items display over a YAML file opened in the view of another plugin remains to be tested in a step of the [roadmap](../TODO.md).
