#!/usr/bin/env zsh
# Recursively collect all .js, .jsx, .css, and .html files under the current directory,
# skip common vendor/build directories, label each section with its file path,
# and copy the combined text to the clipboard (macOS pbcopy).

set -euo pipefail

# Prune these directories anywhere in the tree
PRUNE_DIRS=(.git node_modules dist build)

# Build and run the find with pruning
find . \
  \( -type d \( -name "${PRUNE_DIRS[1]}" -o -name "${PRUNE_DIRS[2]}" -o -name "${PRUNE_DIRS[3]}" -o -name "${PRUNE_DIRS[4]}" \) -prune \) -o \
  -type f \( -name '*.js' -o -name '*.jsx' -o -name '*.css' -o -name '*.html' \) -print0 \
| while IFS= read -r -d $'\0' file; do
    printf '===== FILE: %s =====\n' "$file"
    cat -- "$file"
    printf '\n\n'
  done \
| pbcopy

# After running this script from your project root, your clipboard will contain:
# ===== FILE: ./Path/To/File.ext =====
# <file contents>
# (blank line)
# ...repeated for every matching file
