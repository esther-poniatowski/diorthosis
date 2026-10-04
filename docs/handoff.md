---
tags:
  - handoff
index: "[diorthosis documentation](docs/_index.md)"
aliases:
  - Handoff
---
# Handoff

The handoff carries the state of diorthosis from one agent session to the next. Each session follows four steps:

1. read this note first;
2. work on one milestone of the [implementation plan](architecture/implementation-plan.md), whose steps are listed in the [roadmap](../TODO.md);
3. check the completed steps in the roadmap;
4. update this note before ending.

## Task state

The project holds its documentation, its toolchain configuration, an empty source tree in four layers, and an example vault. No dependency is installed, no check has run, and no file is committed. The repository exists locally only, with no remote. The first commit of this scaffold awaits the approval of the user.

The next milestone is *Toolchain and spikes*. A session starting that milestone must first read five sources, in this order:

1. the [requirements](requirements.md), since every design choice must cite a requirement;
2. the three [features](features/_index.md): the format of a record, the selectors and the interface;
3. the three [architecture decisions](adr/_index.md), stating the constraints binding on every implementation;
4. the [host interfaces](architecture/host-interfaces.md), naming the interface of Obsidian behind each adapter;
5. the [implementation plan](architecture/implementation-plan.md), fixing the spikes and the exit criterion of the milestone.

The first action of that session is to ask the user to approve installing the development dependencies. Node 22, the version fixed by the file `.nvmrc`, is installed on the machine.

## Active constraints

- Installing the development dependencies changes the environment of the machine, so the user must approve the installation.
- The npm cache `~/.npm` of the machine holds files owned by root, so `npm install` fails with `EACCES`. Until the user repairs the cache, every npm command that downloads must take the option `--cache` pointing to a folder of the session scratchpad.
- The [plugin independence](adr/plugin-independence.md) forbids any change to another plugin, such as the YAML form editor ekphrasis, in order to serve review.
- The [configurable conventions](requirements.md#^configurable-conventions) keep every value specific to one vault out of the code, including the names of the vault that motivated the plugin.
- The prose linter runs through `conda run -n hermeneia hermeneia lint <path>`, with the conda executable of the user.

## Open questions

- Which interface framework draws the bubbles and the vault view.
- Whether diorthosis starts from the code of Sidemark, and from its anchoring library `@mrsf/cli`.
- Whether the editor decorations of a plugin reach a YAML file opened in the view of another plugin.
- Which approximate match re-anchors a quote, and at which threshold.
- Which YAML library rewrites an unchanged record byte for byte and gives the source ranges of field paths.

Each question is assigned one step in the roadmap.

## Consumer vault

The first vault to adopt diorthosis is the research vault of the user, written `<geonexus>` here. The user provides its location on request. No file of that vault may be copied into this public repository. The plugin must handle the constructs below.

**Markdown notes**:

- a YAML frontmatter at the top of every note;
- prose paragraphs written on a single line, 2427 of them longer than 500 characters;
- LaTeX inline between `$` signs and in display between `$$` signs, including inside callouts, the blocks opened by `> [!TYPE]`;
- tables whose cells hold prose and LaTeX, with LaTeX in 2200 table rows;
- block anchors `^name` at the end of a line, and file-relative links carrying the extension `.md`.

**YAML specifications**:

- files with the suffix `.yml`, such as `glossary.yml`, `notation.yml` and `project.yml`, validated by JSON Schemas that reject undeclared keys;
- collections written as mappings keyed by identifiers, such as `terms.<identifier>.gloss`, so most field paths pass through keys;
- comments carrying meaning, such as `# shared candidate` beside a term.

**Contributors and volume**:

- a person signs with the identifier of their contact profile, in kebab case, and an agent signs with its model identifier;
- 548 inline review markers were counted on 2026-10-02, in 168 files among roughly 1500 notes. These markers will be migrated into records once the vault adopts the plugin.

**Records as a contract**: the vault will validate the records against a schema of its own, and will file them in folders named `_reviews/`. Therefore, when the format of [review records](features/review-records.md) changes, that note and the changelog must be updated in the same change.

## Provenance

The requirements derive from a study of review practices held in the private vault of the user, in the folder `docs/practice/reviewing/` of `<geonexus>`. A session may read that vault only at the request of the user. The external sources are cited in the notes that use them: the [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/) in the specification of [selectors](features/selectors.md), and the plugins in the [assessment of existing plugins](references/existing-plugins.md).

## Decision log

The design decisions are recorded in the [architecture decisions](adr/_index.md). The name of the project was chosen by the user among four candidates. In the textual tradition, *diorthosis* names the critical revision of a text, recorded beside it and weighed before being adopted.
