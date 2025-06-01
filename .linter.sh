#!/bin/bash
cd /home/kavia/workspace/code-generation/gamesphere-25322-c5a1bf29/games_store_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

