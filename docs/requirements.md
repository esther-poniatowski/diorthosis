---
tags:
  - requirements
index: "[diorthosis documentation](docs/_index.md)"
aliases:
  - Requirements
---
# Requirements

The requirements of diorthosis are the properties needed from the plugin by a project whose files are reviewed by several contributors. Each review item serves two readers: a person reads and answers the item beside the reviewed file, and an agent or a script reads its record. To justify a design choice, feature notes and decision records cite a requirement by its block anchor.

## Records

- **Standoff storage**: each review item must be stored as one YAML file, apart from the reviewed files. ^standoff-storage
- **Plain records**: a record must remain readable and editable without the plugin, by a person, an agent or a script, so the plugin must keep no cache of its own. ^plain-records
- **Typed items**: each item must declare a kind and a severity, drawn from vocabularies declared for the vault. ^typed-items
- **Attributed thread**: each contribution must carry its author and its timestamp, contributions must be appended in order, and the opening concern must never be overwritten. ^attributed-thread
- **Lifecycle**: each item must carry its state, and closing an item must delete its record. ^lifecycle
- **Stable identifier**: each item must carry an identifier, unique in the vault and opaque, and the file of its record must be named after that identifier. Therefore, a link to that file names the item. ^stable-identifier
- **Resolution trace**: a contribution must be able to list the locations that it edited, and the commit holding the edits. ^resolution-trace

## Anchoring

- **Untouched targets**: no reviewed file may be edited to hold an item, a marker or an anchor. ^untouched-targets
- **Any grain**: an item must be able to target a scope of any grain, from a word to a whole file. The scope can also be a run of words over several lines, or content distributed over several sections or files. ^any-grain
- **Anchor durability**: an item must keep its scope when its target is edited around that scope. When the scope cannot be recovered, the item must be listed as orphaned, and never dropped silently. ^anchor-durability
- **Renamed targets**: when a target file is renamed or moved, the path recorded in every record naming that file must be updated. ^renamed-targets
- **Format adapters**: selectors must be resolved and items displayed according to the format of the target, through one adapter per format. Therefore, a new format must leave the records unchanged. ^format-adapters

## Interface

- **Bubble**: the thread of each item must open in a bubble, beside the open file. ^bubble
- **Marker**: a marker drawn at the anchor of each item must open its bubble, as a decoration of the view. ^marker
- **Highlight**: while a bubble is open, every range of its scope in the open file must be highlighted. ^highlight
- **Collapsible thread**: a thread must expand and collapse. ^collapsible-thread
- **Reply area**: a text area at the end of the thread must receive a reply. Contributions must display Markdown and LaTeX as Obsidian renders them in a note. ^reply-area
- **Capture**: one command must create an item from one or several selections, possibly in several files. ^capture
- **Vault view**: one view must list every item of the vault, orphaned items included, filtered by kind, severity, state and author. ^vault-view

## Independence

- **Plugin independence**: the plugin must depend on no other plugin, and no other plugin may need knowledge of diorthosis. ^plugin-independence
- **Configurable conventions**: the folder of records, the vocabularies and the identity of the author must be declared per vault, so that the plugin holds no value specific to one vault. ^configurable-conventions
