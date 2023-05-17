dev:
	yardman 'packages/**/*' 'app-*/**/*' pnpm-workspace.yaml package.json 'make dev-exec'

dev-exec:
	clear
	bazel build app-1 --verbose_failures --sandbox_debug
	bazel build app-2 --verbose_failures --sandbox_debug
	bazel run app-2
	bazel run app-1

