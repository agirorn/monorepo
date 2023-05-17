# The monorepo

An experiment in using [Bazel.build] to build a multi language monorepo.

The build system is [BAZEL](https://bazel.build/)

To look at some other grate bazel build examples checkout the [aspect build
bazel examples](https://github.com/aspect-build/bazel-examples)


## Programming Languages

The folioing programming language are built int in this monorepo.

- python (PENDING)
- Typescript

## Tools Languages

## Setup

Assuming you are running on a Mac

### Installation

```bash
  brew install pnpm
  brew install bazelisk
  pnpm add -g yardman
```

**Visualize your build**

If you plan to Visualize your build, then you will also need graphviz

```bash
brew install graphviz
```

### Preflight

To make all the packages available in the editors for code completion run this

```bash
  pnpm install
```

To update the aspect presets run

```bash
bazel run //.aspect/bazelrc:update_aspect_bazelrc_presets
```

## Useful Commands

###  List all publicly available targets

```bash
bazel query //...
```
### List all targets in current directory

```bash
bazel query '...'
```

### Simple query

```bash
bazel query 'attr(visibility, "//visibility:public", //packages/npm/one:*)'
```

### Visualize your build

Collect the graph for app-1

```bash
bazel query 'deps(//app-1:app-1)' --output graph > graph.in
```

Generate a PNG of the collected graph

```bash
dot -Tpng < graph.in > graph.png
```

```bash
 bazel query --noimplicit_deps 'deps(//app-1:app-1)' --output graph > simplified_graph.in
dot -Tpng < simplified_graph.in > simplified_graph.png
```

Interactive view of the graph
```bash
xdot <(bazel query --notool_deps --noimplicit_deps "deps(//app-1:app-1)"  --output graph)
```

[Bazel.build]: https://bazel.build/
