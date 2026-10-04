---
tags:
  - assessment
index: "[References - Existing plugins](docs/references/_index.md)"
aliases:
  - Plugins for comments and review
---
# Plugins for comments and review

Nine community plugins of Obsidian store comments or suggested edits on a note. None of them meets the [requirements](../requirements.md) of diorthosis, since none reviews a YAML file or anchors an item to content spread over several files. Of these plugins, Sidemark meets the most requirements, and its code can serve as a starting point.

> [!INFO] Provenance
> Versions and features were read on 2026-10-02 and 2026-10-04, from the page of each plugin in the community directory or from its repository. When that documentation omits a feature, the feature is marked as undocumented and remains untested.

## Inventory

The plugins divide by the location of their storage: inside the reviewed note, or in separate files.

| Plugin | Storage of an item | Metadata and thread | View | Maturity |
| --- | --- | --- | --- | --- |
| [Commentator](https://github.com/Fevol/obsidian-criticmarkup) | CriticMarkup in the note, with metadata as JSON before `@@` | author and time; adjacent comments form a thread | whole vault, filtered by author and time | beta through BRAT, version 0.2.7 of 2024-08-07, development paused |
| [Track Changes](https://github.com/philphilphil/obsidian-track-changes) | CriticMarkup in the note, with `author="…" date="…"` prefixes | author and date; adjacent comments form a thread | one note | version 2.2.0 |
| [Relay Comments](https://community.obsidian.md/plugins/relay-comments) | CriticMarkup in the note, with `authorId` and `author` | author; threads | one note | version 0.5.0 |
| [Review Critic](https://community.obsidian.md/plugins/review-critic) | CriticMarkup in the note | default author | one note | version 2.1.1 |
| [Review Comments AI](https://github.com/mikegafert/obsidian-review-comments-ai) | CriticMarkup in the note, with `author\|date\|TYPE` | author, date, one type among four; a `DONE` marker closes a thread | one note | version 3.1.0, AGPL license |
| [Document Comments](https://github.com/kylemcd/obsidian-document-comments) | hidden HTML comments in the note | identifier, author, time, status; replies | one note | version 0.1.15 |
| [Obelisk](https://github.com/zachhannum/obelisk) | YAML under a key of the frontmatter of the note | identifier, author, date, origin of an agent comment; replies | one note | version 0.2.0, early stage |
| [Sidemark](https://github.com/coddingtonbear/obsidian-sidemark) | one sidecar file per note, in the [Markdown Review Sidecar Format](https://raw.githubusercontent.com/wictorwilen/MRSF/main/MRSF-v1.0.md), anchored by line, column and surrounding context | UUID, author, timestamp, reply, resolution | one note: margin cards, highlight of the active passage, collapsible threads, reply field | version 1.4.0, MIT license |
| [Siden](https://github.com/giuseqpe/siden) | one Markdown file per annotation, in a hidden folder; anchors recovered after edits | status open, resolved or orphaned | whole vault; margin cards for Markdown, sidebar for PDF | version 0.1.0, MIT license |

## Assessment

The plugins are measured against the requirements of diorthosis with four marks: ✓ met, ◐ met in part, ✗ not met, ? undocumented.

| Requirement | Plugins storing in the note | Sidemark | Siden |
| --- | --- | --- | --- |
| [Untouched targets](../requirements.md#^untouched-targets) | ✗ | ✓ | ✓ |
| [Format adapters](../requirements.md#^format-adapters) | ✗ Markdown only | ✗ Markdown only | ◐ Markdown and PDF |
| [Any grain](../requirements.md#^any-grain) | ◐ span in one note | ◐ span in one note | ◐ span in one note |
| [Anchor durability](../requirements.md#^anchor-durability) | ✓ markup moves with the text | ✓ context, and re-anchoring by hand | ✓ recovery, orphans listed |
| [Typed items](../requirements.md#^typed-items) | ◐ four fixed types in Review Comments AI | ? `type` and `severity` in the format, not in the interface | ✗ |
| [Attributed thread](../requirements.md#^attributed-thread) | ✓ except Review Critic | ✓ | ? |
| [Resolution trace](../requirements.md#^resolution-trace) | ✗ | ✗ | ✗ |
| [Stable identifier](../requirements.md#^stable-identifier) | ◐ in Document Comments and Obelisk, not linkable | ◐ not linkable | ? |
| [Bubble](../requirements.md#^bubble), [highlight](../requirements.md#^highlight), [collapsible thread](../requirements.md#^collapsible-thread), [reply area](../requirements.md#^reply-area) | ◐ varies by plugin | ✓ | ◐ margin cards |
| [Vault view](../requirements.md#^vault-view) | ✓ in Commentator alone | ✗ | ✓ |

## Starting point

Sidemark leaves the note untouched, and already implements for Markdown notes the four elements of the interface listed in its inventory row. Its code is published under the MIT license, so diorthosis can start from it. In that case, the work on that code covers four extensions:

- one record per item, instead of one sidecar per note;
- several targets per item, possibly in several files;
- the format adapters, starting with YAML;
- the typed items, the resolution trace and the vault view.
