---
tags:
  - feature
index: "[Features](docs/features/_index.md)"
aliases:
  - Selectors
---
# Selectors

A selector locates one part of the scope of an item inside the text of a target file. Therefore, the target file itself is never edited, as the [untouched targets](../requirements.md#^untouched-targets) demand. The plugin resolves every selector by one process. The adapter of the target format turns the selector into a range of the text of the file, and the interface draws the marker and the highlight on that range.

## Selector types

Five selector types cover every grain listed by the requirement on [any grain](../requirements.md#^any-grain). The first three are text selectors of the [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/), and apply to every text file. The last two are structural selectors, each read by the adapter of one format:

| Type | Fields | Designated range | Formats |
| --- | --- | --- | --- |
| `TextQuoteSelector` | `exact`, with optional `prefix` and `suffix` | the text equal to `exact`, preceded by `prefix` and followed by `suffix` | every text file |
| `TextPositionSelector` | `start`, `end` | the characters from position `start`, included, to position `end`, excluded, counted from zero | every text file |
| `RangeSelector` | `startSelector`, `endSelector` | the text from the start of the first range to the end of the second | every text file |
| `HeadingPathSelector` | `path`, the list of headings from the top level down | the section opened by the last heading, up to the next heading of the same or a higher level | Markdown |
| `FieldPathSelector` | `path`, in dot-and-bracket notation | the value of the designated field | YAML |

A target without selectors designates the whole file. Content distributed over several sections or files is designated by several targets in one record.

## Combination

A target may list several selectors that designate the same range, so that one selector recovers the range when another fails. At capture, the plugin records a text quote and the positions of each selected range. The context of the quote takes up to fifty characters on each side, within the line of the range, and stops at a word boundary. The plugin adds a structural selector when the adapter reads a heading path or a field path around the selection. The quote is then searched only within the section or the field of that structural selector.

In a field path, a key of a mapping follows a dot, and a position in a sequence stands between brackets, counted from zero. A path through keys, such as `terms.weak-coupling.gloss`, keeps designating the same field when the mapping is reordered. By contrast, a path through a position, such as `foils[1]`, designates another field once the sequence is reordered. Therefore, a target designated by such a path must also carry a text quote of the targeted value.

## Re-anchoring

After a target is edited, the plugin recovers each range in three attempts, in this order:

1. the positions, accepted when the text at these positions still equals the quote;
2. the quote with its context, searched within the range of the structural selector, if the target carries a structural selector;
3. an approximate match of the quote, accepted above a similarity threshold set in the settings.

When no attempt recovers a range, the item is listed as orphaned, as the [anchor durability](../requirements.md#^anchor-durability) demands. An orphaned item keeps its record and its thread, and its bubble offers to anchor the item to a new selection or to close the item.

The recovered positions are written into the record at its next save, such as a reply or a change of state. Therefore, editing a reviewed file alone leaves every record unchanged.

## Renamed targets

Obsidian updates the links to a renamed file, but no path written inside a YAML file. Therefore, the plugin listens to the renames and moves of the vault. On each rename or move, the plugin rewrites the path of the target in every record naming that file, as the requirement on [renamed targets](../requirements.md#^renamed-targets) demands. When a record names a missing file, the record is listed as orphaned.
