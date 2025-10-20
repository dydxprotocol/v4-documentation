#!/bin/bash

# Script: remark-filter.sh
# Purpose: Filter files based on glob pattern and exclusions for remark linting
# Usage: 
#   ./remark-filter.sh <glob-pattern> [ignore-pattern1] [ignore-pattern2] ...
#   ./remark-filter.sh <glob-pattern> --ignore-file <file>
#   ./remark-filter.sh <glob-pattern> --ignore-file <file> [additional-patterns] ...
# Example: 
#   ./remark-filter.sh './docs/**/*.mdx' 'resources.mdx' 'test.mdx'
#   ./remark-filter.sh './docs/**/*.mdx' --ignore-file .remarkignore
#   ./remark-filter.sh './docs/**/*.mdx' --ignore-file .remarkignore 'extra.mdx'

# Check if at least one argument is provided
if [ $# -lt 1 ]; then
    echo "Usage: $0 <glob-pattern> [ignore-pattern1] [ignore-pattern2] ..."
    echo "       $0 <glob-pattern> --ignore-file <file>"
    echo "       $0 <glob-pattern> --ignore-file <file> [additional-patterns] ..."
    echo ""
    echo "Examples:"
    echo "  $0 './docs/**/*.mdx' 'resources.mdx' 'test.mdx'"
    echo "  $0 './docs/**/*.mdx' --ignore-file .remarkignore"
    exit 1
fi

# First argument is the glob pattern
GLOB_PATTERN="$1"
shift  # Remove the first argument, leaving only ignore patterns

# Array to store all ignore patterns
declare -a IGNORE_PATTERNS

# Process arguments - check for --ignore-file option
while [ $# -gt 0 ]; do
    if [ "$1" = "--ignore-file" ] || [ "$1" = "-f" ]; then
        shift
        if [ $# -eq 0 ]; then
            echo "Error: --ignore-file requires a file argument"
            exit 1
        fi
        IGNORE_FILE="$1"
        if [ ! -f "$IGNORE_FILE" ]; then
            echo "Error: Ignore file '$IGNORE_FILE' not found"
            exit 1
        fi
        # Read patterns from file (skip empty lines and comments)
        while IFS= read -r line || [ -n "$line" ]; do
            # Skip empty lines and lines starting with #
            if [[ ! -z "$line" ]] && [[ ! "$line" =~ ^[[:space:]]*# ]]; then
                # Trim whitespace
                line=$(echo "$line" | xargs)
                IGNORE_PATTERNS+=("$line")
            fi
        done < "$IGNORE_FILE"
        shift
    else
        # Regular ignore pattern argument
        IGNORE_PATTERNS+=("$1")
        shift
    fi
done

# Convert glob pattern to find command parameters
# Remove leading ./ if present
GLOB_PATTERN="${GLOB_PATTERN#./}"

# Extract directory and file pattern from glob
# Handle patterns like 'docs/**/*.mdx' or './docs/**/*.mdx'
if [[ "$GLOB_PATTERN" == *"**"* ]]; then
    # Extract base directory (everything before /**)
    BASE_DIR="${GLOB_PATTERN%%/**/*}"
    # Extract file pattern (everything after last /)
    FILE_PATTERN="${GLOB_PATTERN##*/}"

    # If no base directory, use current directory
    if [ -z "$BASE_DIR" ]; then
        BASE_DIR="."
    fi
else
    # Simple glob without recursive search
    BASE_DIR=$(dirname "$GLOB_PATTERN")
    FILE_PATTERN=$(basename "$GLOB_PATTERN")
fi

# Build the find command
FIND_CMD="find $BASE_DIR -type f -name '$FILE_PATTERN'"

# Add exclusions for each ignore pattern
for IGNORE_PATTERN in "${IGNORE_PATTERNS[@]}"; do
    # Add -not -path for each ignore pattern
    # Support both full paths and pattern matching
    if [[ "$IGNORE_PATTERN" == /* ]] || [[ "$IGNORE_PATTERN" == ./* ]]; then
        # Full path provided
        FIND_CMD="$FIND_CMD -not -path '$IGNORE_PATTERN'"
    else
        # Pattern provided (like 'resources.mdx')
        FIND_CMD="$FIND_CMD -not -path '*$IGNORE_PATTERN'"
    fi
done

# Sort the output for consistent results
FIND_CMD="$FIND_CMD | sort"

# Execute the command
eval $FIND_CMD
