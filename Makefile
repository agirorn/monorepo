dev:
	yardman \
		Makefile \
		pnpm-workspace.yaml \
		package.json \
		'packages/**/*' \
		'app-*/**/*' \
		'make dev-exec'

dev-exec:
	clear
	@# Run all the test, so first bazel will build everything needed
	bazel test //...
	@# Linting tsconfig
	@# bazel test //packages/npm/tsconfig:eslint_test
	@# Something else
	@# bazel test //packages/npm/eslint-config:eslint_test
	@# bazel build //packages/npm/eslint-config
	@# bazel build //packages/npm/prettier-config
	@# bazel test packages/npm/three:eslint_test
	@# bazel build app-1 --verbose_failures --sandbox_debug
	@# bazel build app-2 --verbose_failures --sandbox_debug
	@# bazel run app-2
	@# bazel run app-1

integration-dev:
	yardman \
		Makefile \
		pnpm-workspace.yaml \
		package.json \
		'packages/**/*' \
		'app-*/**/*' \
		'make integration-dev-exec'

integration-dev-exec:
	clear
	@# Running all tests marked as size large since we are using that for all the
	@# integration tests for now.
	bazel test '//...' --test_size_filters=large
