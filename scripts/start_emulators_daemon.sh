#!/bin/bash
BOLD=$(tput bold)
YELLOW=$(tput setaf 3)
GREEN=$(tput setaf 2)
NORMAL=$(tput sgr0)

export JAVA_HOME="${JAVA_HOME:-/opt/homebrew/opt/openjdk@21}"
PID_FILE=".emulators.pid"

# Prevent the agent from accidentally starting multiple instances
if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE") 2>/dev/null; then
  echo "${BOLD}${YELLOW}WARNING:${NORMAL} Emulators are already running (PID: $(cat $PID_FILE))!"
  exit 0
fi

echo "Starting Firebase emulators in the background..."

# nohup keeps it alive, > redirects output, & backgrounds it
nohup npx firebase emulators:start --only firestore,auth --import=tmp/ --export-on-exit=tmp/ > emulators.log 2>&1 &

# Grab the process ID of the last backgrounded job
PID=$!
echo $PID > "$PID_FILE"

echo "${BOLD}${GREEN}SUCCESS:${NORMAL} Emulators running in background (PID: $PID). Logs safely tucked away in emulators.log."
