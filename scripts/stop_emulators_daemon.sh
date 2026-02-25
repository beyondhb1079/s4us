#!/bin/bash
PID_FILE=".emulators.pid"

if [ -f "$PID_FILE" ]; then
  PID=$(cat "$PID_FILE")
  echo "Terminating emulator process $PID..."
  kill "$PID"
  rm "$PID_FILE"
  echo "Emulators successfully stopped."
else
  echo "No PID file found. Are you sure the emulators were even running?"
fi
