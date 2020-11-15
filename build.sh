#/bin/bash
hexo clean
hexo generate
cd public
http-server