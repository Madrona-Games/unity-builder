import { getExecOutput } from '@actions/exec';

class MacBuilder {
  public static async run(actionFolder, silent = false) {
    const result = await getExecOutput('bash', [`${actionFolder}/platforms/mac/entrypoint.sh`], {
      silent,
    });

    // Check for errors in the Build Results section
    const match = result.stdout.match(/^#\s*Build results\s*#(.*)^Size:/ms);

    if (match) {
      const buildResults = match[1];
      const errorMatch = buildResults.match(/^Errors:\s*(\d+)$/m);
      if (errorMatch && Number.parseInt(errorMatch[1], 10) !== 0) {
        throw new Error(`There was an error building the project. Please read the logs for details.`);
      }
    }
  }
}

export default MacBuilder;
