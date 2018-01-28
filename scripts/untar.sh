#!/bin/bash
set -x

cd $REMOTE_APP_DIR && \ 
rm -rf public_html && \
mkdir public_html && \
tar zxvf package.tgz -C public_html && \
rm package.tgz