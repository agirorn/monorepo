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
	@# Build all packages
	time bazel build //... --strategy=TsProject=darwin-sandbox
	clear
	@# Run one tests (The integrataion test from packages/npm/one/BUILD.bazel)
	time bazel test --test_output=all //packages/npm/one:integration_test
	@# Run one tests (The integrataion test from packages/npm/one/BUILD.bazel)
	time bazel test --test_output=all //packages/npm/one:eslint_test
	exit 0
	@# @# Run all tests
	@# bazel test --test_output=all //...
	@# @# load our postgres image in docker
	@# bazel run postgres:postgres_image -- --norun
	@# @#...
	@# @# load our flyway DB one migration image in docker
	@# bazel run //databases/one:one -- --norun
	@# @#...
	@# @# Linting tsconfig
	@# @# bazel test //packages/npm/tsconfig:eslint_test
	@# @# Something else
	@# @# bazel test //packages/npm/eslint-config:eslint_test
	@# @# bazel build //packages/npm/eslint-config
	@# @# bazel build //packages/npm/prettier-config
	@# @# bazel test packages/npm/three:eslint_test
	@# @# bazel build app-1 --verbose_failures --sandbox_debug
	@# @# bazel build app-2 --verbose_failures --sandbox_debug
	@# @# bazel run app-2
	@# @# bazel run app-1

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
