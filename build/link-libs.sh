#/bin/sh

pnpm nx run-many -t build  --with-deps --quiet
BASE_PATH_DIST=`pwd`/dist/packages

# clis
BASE_PATH_CLI=`pwd`/cli

link_lib() {
  cli=$1
  name=$2

  # cd $BASE_PATH_DIST/$name
  # npm i --silent
  # npm i --silent@swc/helpers
  # cd node_modules/@swc/helpers
  # npm run --silent build

  cd $BASE_PATH_DIST/$name
  npm --silent link
  npm i
}

link_cli() {
  cli=$1; shift
  libs=( "$@" )
  last_idx=$(( ${#libs[@]} ))
  unset libs[$last_idx]
  linked_libs=

  for lib in "${libs[@]}"; do
    linked_libs="$linked_libs @liebsoer/$lib"

    echo Linking $lib
    link_lib $cli $lib
  done

  cd $BASE_PATH_CLI/$cli

  echo Linking $linked_libs to $cli
  npm --silent link $linked_libs
}

# YNAB CLI
declare -a ynab_libs=("ynab-client" "ynab-config")
link_cli "ynab" "${ynab_libs[@]}"
