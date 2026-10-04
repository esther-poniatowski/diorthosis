---
tags:
  - feature
index: "[Features](docs/features/_index.md)"
aliases:
  - Review records
---
# Review records

A review record holds one review item in a YAML file of its own, apart from the reviewed files, as the [standoff storage](../requirements.md#^standoff-storage) demands. The record carries the fields of the item, the selectors of its targets and its thread. Therefore, the record meets the requirement on [plain records](../requirements.md#^plain-records).

## Files

Each record is a file named after the identifier of its item, such as `rv-k3f9.yml`. The plugin files a new record in the records folder of the narrowest folder holding every target. Therefore, a record reviewing a single note is filed beside that note, whereas a record spanning two projects is filed in their common parent folder. The records folder is named `_reviews/` by default, and can be renamed in the settings, as the [configurable conventions](../requirements.md#^configurable-conventions) demand.

The paths inside a record start at the root of the vault, so a record stays valid when it moves to another folder.

## Fields

Six fields make up a record, in the order below:

| Field | Value | Required |
| --- | --- | --- |
| `id` | identifier of the item, equal to the name of the file without its extension | yes |
| `kind` | kind of the request, drawn from the vocabulary of kinds | yes |
| `severity` | effect of the concern on its target, drawn from the vocabulary of severities | yes |
| `state` | `open` or `answered` | yes |
| `targets` | list of targets, each holding a `file` and, optionally, the `selectors` of its part of the scope | yes |
| `thread` | list of contributions, the first one stating the concern | yes |

Each contribution of the thread holds five fields:

| Field | Value | Required |
| --- | --- | --- |
| `author` | identity of the contributor, a person or an agent | yes |
| `timestamp` | date and time of the contribution, in the format of ISO 8601 with its offset | yes |
| `body` | text of the contribution, in Markdown with LaTeX | yes |
| `edits` | locations edited by the contribution, each a `file` with optional `selectors` | no |
| `commit` | identifier of the commit holding the edits | no |

The last two fields carry the [resolution trace](../requirements.md#^resolution-trace).

## Vocabularies

The kinds and the severities are declared in a vocabulary file, named in the settings. When the settings name no vocabulary file, the plugin applies its default vocabulary. The kinds of this default vocabulary cover requests at every grain, from one word to several files:

| Kind | Request |
| --- | --- |
| `question` | answer a question, or clarify a claim |
| `assess` | evaluate a claim or an argument, and recommend |
| `term` | choose or define a term |
| `style` | reformulate without changing the claim |
| `correct` | repair an error of fact, of logic or of mathematics |
| `argue` | supply a missing step, or repair the logic of an argument |
| `source` | supply a citation or a piece of evidence |
| `restructure` | reorder, split or extract content within one file |
| `relocate` | move content between files |

The default vocabulary declares three severities:

- `blocking`: the item must close before its target is considered complete;
- `major`: the item weakens the argument or the structure of its target;
- `minor`: the item affects only the form of its target.

## States

An item is `open` until a contribution proposes a resolution, and `answered` until a decision closes it. When an item is closed, its record is deleted, as the [lifecycle](../requirements.md#^lifecycle) demands. Therefore, the decision is recorded by the commit that removes the record file.

## Identifier

At capture, the plugin draws each identifier as the prefix `rv-` followed by four characters in base 36. The plugin draws again until the identifier is unique in the vault. The identifier never encodes the target or the concern, so the identifier stays valid when a target is renamed or a concern is reworded.

## Example

The record below belongs to the example vault of the repository, and its [selector types](selectors.md) are specified in a note of their own. The record targets one word of a note and one field of a glossary:

```yaml
id: rv-k3f9
kind: term
severity: major
state: answered
targets:
  - file: notes/saturation.md
    selectors:
      - type: TextQuoteSelector
        exact: weak
        prefix: 'The response saturates when the coupling is '
        suffix: '. Beyond the critical value, the response grows'
      - type: TextPositionSelector
        start: 102
        end: 106
  - file: glossary.yml
    selectors:
      - type: FieldPathSelector
        path: terms.weak-coupling.gloss
thread:
  - author: esther-poniatowski
    timestamp: 2026-10-02T10:14:00+02:00
    body: 'State the condition on the coupling, such as $\lVert W \rVert_2 < 1$, and align the gloss of the term.'
  - author: claude-opus-5-5
    timestamp: 2026-10-03T09:02:00+02:00
    body: 'Proposed condition: $\lVert W \rVert_2 < 1$. The note and the gloss remain to be edited once the condition is accepted.'
```

The field names `author`, `timestamp` and `severity` are taken from the [Markdown Review Sidecar Format](https://raw.githubusercontent.com/wictorwilen/MRSF/main/MRSF-v1.0.md), wherever the meanings coincide. Therefore, when every target of a record is a Markdown note, the record can be converted to that format.
