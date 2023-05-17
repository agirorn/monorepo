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

### Preflight

To make all the packages available in the editors for code completion run this

```bash
  pnpm install
```

To update the aspect presets run

```bash
bazel run //.aspect/bazelrc:update_aspect_bazelrc_presets
```
[Bazel.build]: https://bazel.build/
