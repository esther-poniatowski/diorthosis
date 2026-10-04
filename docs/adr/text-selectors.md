---
tags:
  - decision
index: "[Architecture decisions](docs/adr/_index.md)"
aliases:
  - Text selectors
status: accepted
---
# Text selectors

> [!QUESTION] Goal: how does a record locate the scope of its item?

A record stored apart from its targets must still designate a range of their text, at any grain, and keep designating that range while the targets are edited. The locating mechanism determines three properties of the design:

- whether a target changes;
- which formats can be reviewed;
- how an item is treated once its text has moved.

## Decision

A record locates each part of its scope by selectors, as the specification of [selectors](../features/selectors.md) details. These selectors are the text selectors of the [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/), and two structural selectors for Markdown sections and YAML fields.

## Constraints

- **Untouched targets**: the requirement on [untouched targets](../requirements.md#^untouched-targets) excludes an anchor written into the target, such as a block identifier or a link.
- **Format adapters**: the requirement on [format adapters](../requirements.md#^format-adapters) calls for one locating process across formats.
- **Anchor durability**: the requirement on [anchor durability](../requirements.md#^anchor-durability) calls for a scope recovered after edits, and for an orphan reported instead of a scope dropped.

## Options weighed

| Option | Benefit | Cost |
| --- | --- | --- |
| Anchor written into the target, such as a block identifier | The anchor moves with its text | Every reviewed file changes, and a YAML record admits no anchor in its data |
| Line and column alone | Simple to record and to resolve | Any edit above the scope moves the range, with no means of recovering it |
| Quote with its context, positions and ranges, as in Web Annotation, with structural selectors added | One process for every text file, positions for the unchanged text, and the quote for the text that has moved | Re-anchoring must be implemented, and an approximate match can attach a scope to the wrong text |

## Consequences

- The plugin must re-anchor every item of a file after an edit, and report every item that fails to re-anchor.
- The approximate match takes a similarity threshold, set in the settings, so that each user can trade recovered scopes against wrong attachments.
- The path recorded in the `file` field of a target is not updated when the file is renamed, so the plugin must rewrite that path, as the requirement on [renamed targets](../requirements.md#^renamed-targets) demands.
