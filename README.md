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

[Bazel Query guide](https://bazel.build/query/guide)

## Inspecting docker containers

The Docker containers build in the repo do not have sh or bash so you can´t
shell into them to inspect them so you have to use other methods to inspect them

### List files and folders in the image

```bash
docker create --name="tmp_$$" bazel/app-1:image
# List the fils int container
docker export tmp_$$ | tar t
docker rm tmp_$$
```

### Export the image to a tar file

The image to a tar file that can be opend up and inspected.

```bash
docker create --name="tmp_$$" bazel/app-1:image
# Exports the image to a tar file
docker export tmp_$$ > tar.tar
docker rm tmp_$$
```

# Filtering tests

## Tests can be filtered by size

The sizes are: [small, medium, large, enormous][test.size]

```bash
bazel test '//...' --test_size_filters=small
bazel test '//...' --test_size_filters=medium
```

# Integration tests

## Using [test containers][Testcontainers]

[Testcontainers] is a library that supports tests for multiple language (Java,
Node.js, Python and more) this library is a wrapper around working with Docker
containers in tests.

See the [Node.js quick start guide][Testcontainers.Quickstart] for more information.

All  bazel integration test could use this mechanism to run there integration
tests and then Bazel can run the integration tests like any other unit test.

But all build agents would need to have docker and the docker images would
need to be build need to be build and run before the tests start.

## Roll your own

One way to run integration tests using infrastucture like PostgreSQL is to to
roll your own like the do at [Dataform][dataform] acording to this post
"How to run services for integration tests with Bazel (ActiveMQ,
PostgreSQL, MySQL)" on [reddit][reddit.integration_tests].

[Dataform][dataform] start a new PostgreSQL server inside a docker container in
the beginning of the first test using this [fixture][dataform.fixture]. The
docker image they start is built in the [BUILD][dataform.build] file.

Then when the tests are finished they shut down the server.

# Bazel Docs

- [rules_docker](https://github.com/bazelbuild/rules_docker/blob/master/docs/container.md)

[Bazel.build]: https://bazel.build/
[test.size]: https://bazel.build/reference/be/common-definitions#test.size
[reddit.integration_tests]: https://www.reddit.com/r/bazel/comments/kcmbwb/how_to_run_services_for_integration_tests_with/
[dataform.build]: https://github.com/dataform-co/dataform/blob/main/tools/postgres/BUILD
[dataform.fixture]: https://github.com/dataform-co/dataform/blob/main/tools/postgres/postgres_fixture.ts
[dataform]: https://github.com/dataform-co/dataform#readme
[Testcontainers]: https://www.testcontainers.org/
[Testcontainers.Quickstart]: https://node.testcontainers.org/quickstart/

