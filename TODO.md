# Roadmap

The roadmap of diorthosis lists the steps of each milestone of the [implementation plan](docs/architecture/implementation-plan.md), with the state of each step. Each step opens with the [feature](docs/features/_index.md) or the area served by the step, and each completed step carries the date of its check. Within each milestone, each step follows its prerequisites.

## Toolchain and spikes

- [ ] **Tooling**: install the development dependencies and commit a lock file, so that `npm ci` passes in continuous integration.
- [ ] **Tooling**: run the format, lint, type and build checks on the empty source tree, and confirm that each check fails on a planted defect. Once the folder `tests/` holds a test, remove the option `--no-error-on-unmatched-pattern` from the scripts of `package.json`.
- [ ] **Tooling**: write the synthetic fixtures reproducing the constructs of the consumer vault listed in the [handoff](docs/handoff.md), and the optional corpus test defined in the [implementation plan](docs/architecture/implementation-plan.md).
- [ ] **Review interface**: read the code of Sidemark and of its anchoring library `@mrsf/cli`, and decide in a decision record whether diorthosis starts from that code.
- [ ] **Review records**: choose the YAML library that rewrites an unchanged record byte for byte and gives the source ranges of field paths, in a decision record.
- [ ] **Review interface**: decide the interface framework of the bubbles and of the vault view in a decision record. Then, declare the JSX settings of that framework in `tsconfig.json`, if the framework requires any.
- [ ] **Review interface**: confirm in a test vault whether the editor decorations of a plugin reach a YAML file opened in the view of another plugin, such as YAML Editor or ekphrasis.
- [ ] **Selectors**: choose the library or the algorithm of the approximate match, and measure it on edited fixtures.

## Records

- [ ] **Review records**: specify in the [feature on review records](docs/features/review-records.md) the format of the vocabulary file, the keys of the settings with their defaults, and the default threshold of the approximate match.
- [ ] **Review records**: publish the JSON Schema of a record, so that a vault can validate its records against the format of the plugin.
- [ ] **Review records**: model a record, its vocabularies and its states in the domain.
- [ ] **Review records**: read and write record files through the YAML parser, preserving the order of the fields.
- [ ] **Review records**: draw unique identifiers, and file a new record in the records folder of the narrowest folder holding every target.
- [ ] **Review records**: declare the records folder, the vocabulary file and the identity of the author in the settings tab.

## Anchoring

- [ ] **Selectors**: resolve text quotes, positions and ranges into ranges of a text.
- [ ] **Selectors**: resolve heading paths in Markdown and field paths in YAML.
- [ ] **Selectors**: re-anchor the items of a file after an edit, and list the orphans.
- [ ] **Selectors**: rewrite the paths of renamed and moved targets in every record naming them.

## Markdown interface

- [ ] **Review interface**: write the manual test protocol of the review interface in the example vault.
- [ ] **Review interface**: draw a marker at the anchor of each item in the editor and in the reading view.
- [ ] **Review interface**: open the bubble of an item beside the note, and highlight its scope.
- [ ] **Review interface**: render the thread with Markdown and LaTeX, collapse and expand it, and append replies from the reply area.

## Capture and decisions

- [ ] **Review interface**: create an item from one or several selections, possibly in several files.
- [ ] **Review interface**: add a selection to an item, re-anchor an orphaned target, change a state, and close an item.

## Vault view

- [ ] **Review interface**: add to the example vault one record for each value of each filter of the vault view.
- [ ] **Review interface**: list every item of the vault, orphaned items included, filtered by kind, severity, state and author.

## YAML adapter

- [ ] **Review interface**: draw the interface in a text view of a YAML file, following the result of the spike on editor decorations.

## Release

- [ ] **Tooling**: publish the repository, and release a first version installable through BRAT.
