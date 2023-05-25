# Declare the local Bazel workspace.
workspace(
    # If your ruleset is "official"
    # (i.e. is in the bazelbuild GitHub org)
    # then this should just be named "rules_ts"
    # see https://docs.bazel.build/versions/main/skylark/deploying.html#workspace
    name = "monorepo",
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

# aspect-build/bazel-lib: Common useful functions for writing BUILD files and Starlark macros/rules
# https://github.com/aspect-build/bazel-lib
http_archive(
    name = "aspect_bazel_lib",
    sha256 = "5f3443b1d98a462a8b7330f4742483afc8b2d17c8555dd97ce4146f43e961718",
    strip_prefix = "bazel-lib-1.31.1",
    url = "https://github.com/aspect-build/bazel-lib/releases/download/v1.31.1/bazel-lib-v1.31.1.tar.gz",
)

# bazelbuild/bazel-skylib: Common useful functions and rules for Bazel
# https://github.com/bazelbuild/bazel-skylib
http_archive(
    name = "bazel_skylib",
    sha256 = "74d544d96f4a5bb630d465ca8bbcfe231e3594e5aae57e1edbf17a6eb3ca2506",
    urls = ["https://github.com/bazelbuild/bazel-skylib/releases/download/1.3.0/bazel-skylib-1.3.0.tar.gz"],
)

# aspect-build/rules_js: High-performance Bazel rules for running Node.js tools and building JavaScript projects
# https://github.com/aspect-build/rules_js
http_archive(
    name = "aspect_rules_js",
    sha256 = "dcd1567d4a93a8634ec0b888b371a60b93c18d980f77dace02eb176531a71fcf",
    strip_prefix = "rules_js-1.26.0",
    url = "https://github.com/aspect-build/rules_js/releases/download/v1.26.0/rules_js-v1.26.0.tar.gz",
)

# aspect-build/rules_ts: Bazel rules for the `tsc` compiler from http://typescriptlang.org
# https://github.com/aspect-build/rules_ts
http_archive(
    name = "aspect_rules_ts",
    sha256 = "ace5b609603d9b5b875d56c9c07182357c4ee495030f40dcefb10d443ba8c208",
    strip_prefix = "rules_ts-1.4.0",
    url = "https://github.com/aspect-build/rules_ts/releases/download/v1.4.0/rules_ts-v1.4.0.tar.gz",
)

# TODO: Document what this id doing
load("@aspect_rules_js//js:repositories.bzl", "rules_js_dependencies")

# TODO: Document what this id doing
rules_js_dependencies()

# TODO: Document what this id doing
load("@aspect_rules_ts//ts:repositories.bzl", "rules_ts_dependencies")

# TODO: Document what this id doing
rules_ts_dependencies(ts_version_from = "//:package.json")

# TODO: Document what this id doing
load("@rules_nodejs//nodejs:repositories.bzl", "DEFAULT_NODE_VERSION", "nodejs_register_toolchains")

# TODO: Document what this id doing
nodejs_register_toolchains(
    name = "nodejs",
    # Node_version should probabaly be set to a fixed version controled by this
    # repo and not rules_nodejs
    # node_version = 16.14.2,
    node_version = DEFAULT_NODE_VERSION,
)

# TODO: Document what this is doing
load("@aspect_rules_js//npm:npm_import.bzl", "npm_translate_lock")

# TODO: Document what this is doing
npm_translate_lock(
    name = "npm",
    bins = {
        # derived from "bin" attribute in node_modules/typescript/package.json
        "typescript": {
            "tsc": "./bin/tsc",
            "tsserver": "./bin/tsserver",
        },
    },
    npmrc = "//:.npmrc",
    pnpm_lock = "//:pnpm-lock.yaml",
    verify_node_modules_ignored = "//:.bazelignore",
)

# TODO: Document what this id doing
load("@npm//:repositories.bzl", "npm_repositories")

# TODO: Document what this is doing
npm_repositories()

load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")
git_repository(
    name = "com_github_airyhq_bazel_tools",
    branch = "main",
    remote = "https://github.com/airyhq/bazel-tools.git"
)

# TODO: remove when rules_?  upgrades to modern version supporting
http_archive(
    name = "bazel_gazelle",
    sha256 = "727f3e4edd96ea20c29e8c2ca9e8d2af724d8c7778e7923a854b2c80952bc405",
    urls = ["https://github.com/bazelbuild/bazel-gazelle/releases/download/v0.30.0/bazel-gazelle-v0.30.0.tar.gz"],
)

###
# Setup rules_docker
# rules_docker does not work with M1 macs due to ancient rules_go version.
###
http_archive(
    name = "io_bazel_rules_docker",
    sha256 = "b1e80761a8a8243d03ebca8845e9cc1ba6c82ce7c5179ce2b295cd36f7e394bf",
    urls = ["https://github.com/bazelbuild/rules_docker/releases/download/v0.25.0/rules_docker-v0.25.0.tar.gz"],
)

# WORKAROUND START
# This is workaround for M1 users and should be removed once https://github.com/bazelbuild/rules_docker/issues/2036 is fixed.
http_archive(
    name = "io_bazel_rules_go",
    sha256 = "6dc2da7ab4cf5d7bfc7c949776b1b7c733f05e56edc4bcd9022bb249d2e2a996",
    urls = ["https://github.com/bazelbuild/rules_go/releases/download/v0.39.1/rules_go-v0.39.1.zip"],
)

load("@io_bazel_rules_go//go:deps.bzl", "go_register_toolchains", "go_rules_dependencies")

go_rules_dependencies()

go_register_toolchains(version = "1.19.3")
# WORKAROUND END

load("@io_bazel_rules_docker//repositories:repositories.bzl", rules_docker_repositories = "repositories")

rules_docker_repositories()

load("@io_bazel_rules_docker//repositories:deps.bzl", rules_docker_deps = "deps")

rules_docker_deps()

load("@io_bazel_rules_docker//container:container.bzl", "container_pull")

# ARM64
container_pull(
    name = "debian_arm64",
    architecture = "arm64",
    digest = "sha256:bd276cb1059f6502e342d3052a4c2767f2b3a0196508f5c2c34ce6da4a15b104",
    registry = "docker.io",
    repository = "debian",
)

# AMD64 x64
container_pull(
    name = "debian_amd64",
    architecture = "amd64",
    digest = "sha256:9a67b70d0ba1d7c7690f917eedd8d24974dd8fd493205368b1e555a90c954208",
    registry = "docker.io",
    repository = "debian",
)

# # ARM64
# container_pull(
#   name = "flyway_arm64",
#   registry = "docker.io",
#   repository = "flyway/flyway",
#   # 'tag' is also supported, but digest is encouraged for reproducibility.
#   # digest 1ae9c45f24dc is the 8-
#   digest = "sha256:1ae9c45f24dc",
# )

# AMD64 x64
container_pull(
  name = "flyway_amd64",
  registry = "docker.io",
  repository = "flyway/flyway",
  # 'tag' is also supported, but digest is encouraged for reproducibility.
  # digest = "sha256:40a3a8728934" is the flyway/flyway:8-alpine
  # https://hub.docker.com/layers/flyway/flyway/8-alpine/images/sha256-40a3a8728934362b14e81e8be9e472f3e49008a05ad0fef6ed8fc3fa48be6c87?context=explore
  digest = "sha256:40a3a8728934362b14e81e8be9e472f3e49008a05ad0fef6ed8fc3fa48be6c87",
)

# container_pull(
#   name = "java_base",
#   registry = "gcr.io",
#   repository = "distroless/java",
#   # 'tag' is also supported, but digest is encouraged for reproducibility.
#   digest = "sha256:deadbeef",
# )
