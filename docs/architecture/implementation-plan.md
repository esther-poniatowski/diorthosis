---
tags:
  - architecture
index: "[Architecture](docs/architecture/_index.md)"
aliases:
  - Implementation plan
---
# Implementation plan

Diorthosis is built in eight successive milestones, from the toolchain to the first release. Each milestone from the fourth onward delivers a plugin usable in a vault, so that every later milestone extends a working plugin. The steps of each milestone, with their state, are listed once in the [roadmap](../../TODO.md). For each milestone, this note fixes three elements:

- the goal;
- the premises to test;
- the exit criterion.

The modules are placed by layer in the [module layout](#^module-layout), and each milestone creates the modules that its goal requires.

> [!TIP] Ordering rule
> A milestone precedes a second milestone when the second depends on the modules of the first, or on a premise tested by the first. Among independent milestones, the milestone whose failure would change the most decisions comes first.

## Principles

Four principles govern every milestone:

- **Premises before features**: each premise about Obsidian or about a library, unverified by any source, must be tested by a spike in the first milestone. The acceptance criterion of each spike must be stated in its decision record before the spike runs, and its verdict recorded there afterwards. Spike code lies in `tests/spikes/`.
- **Domain first**: within a milestone, the domain modules must be written and tested before the adapters that display them, following the [layers and dependency rule](layers.md).
- **Consumer vault as acceptance test**: a milestone is complete when the constructs of the consumer vault, listed in the [handoff](../handoff.md), behave as specified. The test suite must reproduce these constructs in synthetic fixtures under `tests/fixtures/`. An optional corpus test reads the files of a local vault from the folder named by the environment variable `DIORTHOSIS_CORPUS`, and is skipped when the variable is unset.
- **Untouched targets as regression test**: the requirement on [untouched targets](../requirements.md#^untouched-targets) is checked by every test that runs a use case on a target. Each such test must compare the bytes of the target before and after the run.

## Module layout

Each module is placed in a folder of its layer: ^module-layout

| Layer | Folder | Modules |
| --- | --- | --- |
| Domain | `src/domain/records/` | Record model, vocabularies, states, identifiers, checks of a record against its format |
| Domain | `src/domain/selectors/` | Selector types, resolution of text selectors and heading paths into ranges, parser of field paths |
| Domain | `src/domain/anchoring/` | Order of the re-anchoring attempts, port of the approximate match, orphans |
| Domain | `src/domain/paths/` | Vault paths, narrowest folder holding a set of targets, rewriting of a renamed path |
| Application | `src/application/` | Ports (record store, target source, clock, identity of the author), use cases (capture, reply, change of state, closing, re-anchoring, renamed target, listing), settings |
| Infrastructure | `src/infrastructure/yaml/` | Reader and writer of record files keeping the order of the fields, resolution of field paths with source ranges |
| Infrastructure | `src/infrastructure/matching/` | Implementation of the approximate match |
| Adapters | `src/adapters/obsidian/editor/` | Editor extension drawing markers and highlights |
| Adapters | `src/adapters/obsidian/reading/` | Post-processor drawing markers and highlights in the reading view |
| Adapters | `src/adapters/obsidian/views/` | Bubble column and vault view |
| Adapters | `src/adapters/obsidian/` | Plugin class, commands, settings tab, record store and target source through the vault |

The interface of Obsidian behind each adapter is named in the [host interfaces](host-interfaces.md).

## Milestones

### Toolchain and spikes

**Goal.** A passing run of continuous integration on the empty source tree, and a verdict on each unverified premise.

**Spikes.** Each spike runs in a test vault or in a unit test:

| Premise | Decision affected | Test |
| --- | --- | --- |
| An editor extension reaches a YAML file opened in the view of another plugin | [Plugin independence](../adr/plugin-independence.md), and the design of the YAML adapter | Open a YAML file in the view of YAML Editor, installed in the consumer vault as `yaml-editor`, then in the view of ekphrasis. Register a decoration on its text in each view |
| A YAML library rewrites an unchanged record byte for byte, keeps its comments, and gives the source range of each node | A new decision record on the YAML library | Read and write the fixtures, and resolve their field paths into ranges. The library `yaml` preserved every untouched byte in a spike of ekphrasis |
| An approximate match recovers a moved quote without attaching it to the wrong text | [Text selectors](../adr/text-selectors.md), and the default threshold | Edit the fixtures by script. Then, count the recovered, the misplaced and the orphaned ranges |
| The code of Sidemark, and its anchoring library `@mrsf/cli`, can serve as a starting point | A new decision record on the starting code | Read the code and the licenses, and run the anchoring library on the fixtures |
| The bubbles and the vault view need an interface framework | A new decision record on the interface framework | Compare plain DOM components with a framework on one bubble |

**Exit criterion.** Continuous integration passes with a committed lock file, and each spike has its verdict recorded.

### Records

**Goal.** Records read, written and checked in the domain and in the infrastructure, with the settings of the vault.

**Exit criterion.** Reading then writing an unchanged record keeps its bytes. A malformed record is reported with its file and its field. Identifiers drawn for the fixtures are unique.

### Anchoring

**Goal.** Every selector resolved into a range, every range recovered after an edit or reported as an orphan, and every renamed target followed.

**Exit criterion.** On the fixtures edited by script, every moved quote is recovered, and every deleted quote yields an orphan. The path of a renamed target is rewritten in every record naming that target.

### Markdown interface

**Goal.** Markers, bubbles, highlights, threads and replies in the editor and in the reading view of a note, as the [review interface](../features/review-interface.md) specifies.

**Exit criterion.** The manual protocol of the test vault checks each element of the review interface, and the regression test confirms that no note changed.

### Capture and decisions

**Goal.** Items created from one or several selections, answered, re-anchored and closed.

**Exit criterion.** In the test vault, an item spanning two notes is created, answered and closed, and its record moves to the trash.

### Vault view

**Goal.** Every item of the vault listed and filtered.

**Exit criterion.** Each filter of the vault view selects the expected items of the example vault.

### YAML adapter

**Goal.** The interface drawn over a YAML file, following the verdict of the spike on editor extensions.

**Exit criterion.** An item on a field of a glossary displays at that field, and is recovered after the keys of the glossary are reordered.

### Release

**Goal.** A first version installable through BRAT.

**Exit criterion.** BRAT installs the plugin from the repository into a clean vault, and the plugin loads.
