#!/bin/bash
BOLD=$(tput bold)
YELLOW=$(tput setaf 3)
NORMAL=$(tput sgr0)

warn() {
  echo "${BOLD}${YELLOW}WARNING:${NORMAL} $1"
}

LOCK_FILE=.firebase-emulator.lock
if [ -f "${LOCK_FILE}" ]; then
  warn "Firestore emulators are already running!"
  export FIRESTORE_EMULATOR_HOST='localhost:8080'
  $@ # expands and runs the given command args
  warn "Firestore emulators may still be running!"
else
  touch "${LOCK_FILE}"
  firebase emulators:exec --only firestore,auth --ui --import=tmp/ --export-on-exit=tmp/ "$@" || exit 1
  rm "${LOCK_FILE}"
fi
