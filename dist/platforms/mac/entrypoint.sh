#!/usr/bin/env bash

#
# Create directories for license activation
#

ps aux

sudo mkdir /Library/Application\ Support/Unity
sudo chmod -R 777 /Library/Application\ Support/Unity

ACTIVATE_LICENSE_PATH="$ACTION_FOLDER/BlankProject"
mkdir -p "$ACTIVATE_LICENSE_PATH"

#
# Run steps
#
source $ACTION_FOLDER/platforms/mac/steps/activate.sh
source $ACTION_FOLDER/platforms/mac/steps/build.sh
source $ACTION_FOLDER/platforms/mac/steps/return_license.sh

#
# Remove license activation directory
#

sudo rm -r /Library/Application\ Support/Unity
rm -r "$ACTIVATE_LICENSE_PATH"
#
# Instructions for debugging
#

if [[ $BUILD_EXIT_CODE -gt 0 ]]; then
echo ""
echo "###########################"
echo "#         Failure         #"
echo "###########################"
echo ""
echo "Please note that the exit code is not very descriptive."
echo "Most likely it will not help you solve the issue."
echo ""
echo "To find the reason for failure: please search for errors in the log above."
echo ""
fi;

#
# Exit with code from the build step.
#

ps aux

# Get the process IDs (PIDs) of processes containing "dotnet" and "/Applications/Unity"
pids_dotnet=$(pgrep -f dotnet)
pids_unity=$(pgrep -f /Applications/Unity)

# Combine the PIDs from both searches
pids_combined="$pids_dotnet $pids_unity"

# Check if any matching processes were found
if [[ -n "$pids_combined" ]]; then
    echo "Processes found with 'dotnet' or '/Applications/Unity' in their command:"
    echo "$pids_combined"

    # Kill each process
    for pid in $pids_combined; do
        kill $pid
    done

    echo "Processes killed successfully."
else
    echo "No processes found with 'dotnet' or '/Applications/Unity' in their command."
fi

ps aux

exit $BUILD_EXIT_CODE
