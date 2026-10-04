---
tags:
  - index
index: "[diorthosis documentation](docs/_index.md)"
aliases:
  - Architecture
---
# Architecture

The architecture of diorthosis separates the code that models records and anchors their scopes from the code that draws the interface in Obsidian. The notes describe the target architecture, whereas the [roadmap](../../TODO.md) records which modules exist.

- [Layers and dependency rule](layers.md): to place a new module in the layer whose admitted dependencies include every import of the module.
- [Host interfaces](host-interfaces.md): to know which interface of Obsidian serves each behaviour of the adapters, and which interface remains unverified.
- [Implementation plan](implementation-plan.md): to start the next milestone, and to check when that milestone is complete.
