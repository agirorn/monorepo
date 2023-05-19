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
	# bazel test //packages/npm/eslint-config:eslint_test
	bazel test //packages/npm/one:eslint_test
	# bazel build //packages/npm/eslint-config
	# bazel build //packages/npm/prettier-config
	# bazel test packages/npm/three:eslint_test
	# bazel build app-1 --verbose_failures --sandbox_debug
	# bazel build app-2 --verbose_failures --sandbox_debug
	# bazel run app-2
	# bazel run app-1

