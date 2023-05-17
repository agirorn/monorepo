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
    node_version = DEFAULT_NODE_VERSION,
)

# TODO: Document what this id doing
load("@aspect_rules_js//npm:npm_import.bzl", "npm_translate_lock")

# TODO: Document what this id doing
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

# TODO: Document what this id doing
npm_repositories()
