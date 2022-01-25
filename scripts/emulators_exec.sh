#!/bin/bash
BOLD=$(tput bold)
YELLOW=$(tput setaf 3)
NORMAL=$(tput sgr0)

warn() {
  echo "${BOLD}${YELLOW}WARNING:${NORMAL} $1"
}

if lsof -i tcp:8080; then
  PID=$(lsof -t -i tcp:8080)
  warn "Firestore emulator may already be running (PID: $PID)!"
  export FIRESTORE_EMULATOR_HOST='localhost:8080'
  $@ # expands and runs the given command args
else
  firebase emulators:exec --only firestore,auth --ui --import=tmp/ --export-on-exit=tmp/ "$@" || exit 1
fi

if lsof -i tcp:8080; then
  PID=$(lsof -t -i tcp:8080)
  warn "Firestore emulators may still be running (PID: $PID)!"
fi
