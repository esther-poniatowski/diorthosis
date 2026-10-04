---
tags:
  - feature
index: "[Features](docs/features/_index.md)"
aliases:
  - Review interface
---
# Review interface

The review interface displays the items of the open file beside that file, in the manner of the comments of word processors and of code-review platforms. Every element of the interface is a decoration of the view or a panel, so no reviewed file changes when an item displays.

## Markers and bubbles

A [marker](../requirements.md#^marker) is drawn at the anchor of each item, at the start of its first range in the open file. A click on the marker opens the [bubble](../requirements.md#^bubble) of the item, in a column beside the open file, aligned with the marker. Bubbles of nearby items stack in the order of their anchors.

While a bubble is open, every range of its scope in the open file is [highlighted](../requirements.md#^highlight). The bubble of an item distributed over several files lists its targets in other files, and each entry opens its file at the range of its target.

## Threads

A bubble shows the kind, the severity and the state of its item, then its thread. When a thread holds more than three contributions, the thread [collapses](../requirements.md#^collapsible-thread) to its opening concern and its last contribution, and a click expands it. Each contribution shows its author and its timestamp, and its body renders as Obsidian renders a note, LaTeX included. The edited locations of a contribution display as links.

A [reply area](../requirements.md#^reply-area) ends the thread. A sent reply is appended to the thread, signed with the identity of the author declared in the settings. When a reply proposes a resolution, the same action can set the state of the item to `answered`.

## Commands

The commands below act on items:

| Command | Effect |
| --- | --- |
| *Add review item* | creates a record from the current selection, after asking for the kind, the severity and the concern; further selections, possibly in other files, are added to the same item before it is saved |
| *Add selection to item* | adds the current selection as a new target of an existing item |
| *Re-anchor item* | replaces the selectors of an orphaned target by the current selection |
| *Close item* | deletes the record of the item, after a confirmation |
| *Open review list* | opens the vault view |

The first command meets the requirement on [capture](../requirements.md#^capture).

## Vault view

The [vault view](../requirements.md#^vault-view) lists every item of the vault in a side panel, filtered by kind, severity, state and author, with the orphaned items in a group of their own. A click on an entry opens its first target at its range, with its bubble open.

## Formats

The Markdown adapter draws the interface in the editor and in the reading view of a note. The YAML adapter draws it in a text view of a YAML file. When another plugin owns the view of YAML files, diorthosis opens a YAML file under review in a text view of its own, as the decision on [plugin independence](../adr/plugin-independence.md) records.
