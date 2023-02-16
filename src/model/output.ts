const core = require('@actions/core');

class Output {
  static async setBuildVersion(buildVersion: string) {
    await core.setOutput('buildVersion', buildVersion);
  }

  static async setAndroidVersionCode(androidVersionCode: string) {
    await core.setOutput('androidVersionCode', androidVersionCode);
  }
}

export default Output;
