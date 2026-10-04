---
tags:
  - decision
index: "[Architecture decisions](docs/adr/_index.md)"
aliases:
  - Plugin independence
status: accepted
---
# Plugin independence

> [!QUESTION] Goal: which plugin displays review items over a file opened by another plugin?

YAML files are commonly opened by a plugin that owns their view, such as a form editor. Review items on such files must still display beside them. The plugin that draws the items determines whether review depends on the editor of each format.

## Decision

Diorthosis depends on no other plugin, and no other plugin needs knowledge of diorthosis. Each format adapter of diorthosis draws the interface in a text view of its format.

## Constraints

- **Plugin independence**: the requirement on [plugin independence](../requirements.md#^plugin-independence) keeps each plugin to one concern, so that the editor of a format and the review of its files can evolve separately.
- **Format adapters**: the requirement on [format adapters](../requirements.md#^format-adapters) calls for a new format added by an adapter alone.

## Options weighed

| Option | Benefit | Cost |
| --- | --- | --- |
| Review added to the editor of each format | Items display in the view where the file is edited | Each editor carries review, and review follows the release cycle of every editor |
| Extension point exposed by the editor of each format, to which diorthosis registers its items | Items display in the view where the file is edited | Each editor must know of annotations, and diorthosis depends on the interface of each editor |
| Diorthosis alone, drawing in text views | No other plugin changes, and one adapter adds one format | A file owned by another view is reviewed in a text view of diorthosis, unless the editor decorations of diorthosis reach that view |

## Consequences

- When the view of a YAML file belongs to another plugin, the file is reviewed in a text view of diorthosis. This consequence holds until a test, planned in the [roadmap](../../TODO.md), shows that the editor decorations reach that view.
- Diorthosis renders Markdown and LaTeX in its bubbles through the renderer of Obsidian, with no other plugin involved.
