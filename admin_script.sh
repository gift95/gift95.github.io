#!/usr/bin/env sh
hexo clean
hexo g  -d
git add .
git commit -m 123
git push