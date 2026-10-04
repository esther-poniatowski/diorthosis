---
tags:
  - index
aliases:
  - diorthosis documentation
---
# diorthosis documentation

The documentation of diorthosis specifies an Obsidian plugin that reviews the files of a vault through review items, each stored as a YAML record apart from the reviewed files.

- [Project overview](overview.md): to decide whether the plugin fits a project whose files are reviewed by several contributors.
- [Requirements](requirements.md): to check a design choice against the properties required of the plugin.
- [Existing plugins](references/_index.md): to know which requirements remain unmet by the plugins already available.
- [User guide](guide/_index.md): to install the plugin in a vault.
- [Features](features/_index.md): to know the format of a review record, the selectors that anchor it, and the behaviour of the interface.
- [Architecture decisions](adr/_index.md): to know which constraint fixed each design choice, and which change of constraint reopens the choice.
- [Architecture](architecture/_index.md): to place a new module in the layer whose admitted dependencies include every import of the module.
- [Agent prompts](prompts/_index.md): to have an AI agent implement a milestone.
- [Documentation conventions](documentation-conventions.md): to write a new note and register it in this documentation.
- [Roadmap](../TODO.md): to know which steps are done and which remain open.
- [Handoff](handoff.md): to resume the work in a new agent session.

A feature can be described by three kinds of note, one per folder:

- a feature note states the format and the behaviour;
- a decision record states the constraint that selected this format among the alternatives;
- an architecture note states the module that implements the behaviour.
