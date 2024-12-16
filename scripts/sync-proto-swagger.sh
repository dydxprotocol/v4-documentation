#!/usr/bin/env bash
set -eo pipefail

TEMP_SWAGGER_DIR=swagger-gen
DEST_DIR=pages/developers/protocol

mkdir -p "$TEMP_SWAGGER_DIR"

# curl -sSL https://github.com/dydxprotocol/v4-chain/blob/main/protocol/client/docs/swagger-ui/swagger.yaml > "$TEMP_SWAGGER_DIR"
curl -sSL https://raw.githubusercontent.com/dydxprotocol/v4-chain/main/protocol/client/docs/swagger-ui/swagger.yaml -o "$TEMP_SWAGGER_DIR/swagger.yaml"

widdershins $TEMP_SWAGGER_DIR/swagger.yaml -o $TEMP_SWAGGER_DIR/protocol-docs.md --omitHeader --language_tabs 'python:Python' 'javascript:Javascript'

mkdir -p "$DEST_DIR"

mv "$TEMP_SWAGGER_DIR/protocol-docs.md" "$DEST_DIR"

rm -rf $TEMP_SWAGGER_DIR