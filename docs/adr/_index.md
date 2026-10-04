---
tags:
  - index
index: "[diorthosis documentation](docs/_index.md)"
aliases:
  - Architecture decisions
---
# Architecture decisions

Each architecture decision record fixes one design choice, binding on every subsequent change of the code. To let a reader tell whether a changed constraint reopens the choice, each record states three elements:

- the constraints that forced the choice;
- the options weighed against these constraints;
- the consequences of the choice.

A spike may test a premise of a record already accepted. When the verdict confirms the premise, the record gains a section *Verification* stating the test and its date. When the verdict refutes it, the record takes the status `superseded`, and a new record states the replacement.

Three records are registered:

- [Standoff records](standoff-records.md): to know why each review item is one YAML file stored apart from the reviewed files.
- [Text selectors](text-selectors.md): to know why selectors locate the scope of an item, instead of an anchor written into the target.
- [Plugin independence](plugin-independence.md): to know why diorthosis depends on no other plugin, including the plugins that edit the files it reviews.
