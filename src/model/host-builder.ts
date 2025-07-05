import { exec } from '@actions/exec';
import BuildParameters from './build-parameters';

class HostBuilder {
  public static async run(
    buildParameters: BuildParameters,
    actionFolder: string,
    silent: boolean = false,
  ): Promise<number> {
    this.setEnvironmentVariables(buildParameters, actionFolder);
    switch (process.platform) {
      case 'win32':
        process.env.UNITY_PATH = `C:/Program Files/Unity/Hub/Editor/${buildParameters.editorVersion}`;

        return await this.runWindows(actionFolder, silent);
      case 'darwin':
        return await this.runMac(actionFolder, silent);
      default:
        throw new Error(`Operating System, ${process.platform}, is not supported.`);
    }
  }

  private static async runWindows(actionFolder: string, silent: boolean): Promise<number> {
    const buildScript = `${actionFolder}/platforms/windows/local/entrypoint.ps1`;

    return await exec(
      'Powershell.exe',
      [`-File`, `${buildScript}`, `-ExecutionPolicy`, `Bypass`, `-NoProfile`, `-NonInteractive`],
      {
        silent,
        ignoreReturnCode: true,
      },
    );
  }

  private static async runMac(actionFolder: string, silent: boolean): Promise<number> {
    return await exec('bash', [`${actionFolder}/platforms/mac/entrypoint.sh`], {
      silent,
      ignoreReturnCode: true,
    });
  }

  private static async setEnvironmentVariables(buildParameters: BuildParameters, actionFolder: string) {
    process.env.ACTION_FOLDER = actionFolder;
    process.env.UNITY_VERSION = buildParameters.editorVersion;
    process.env.UNITY_SERIAL = buildParameters.unitySerial;
    process.env.UNITY_LICENSING_SERVER = buildParameters.unityLicensingServer;
    process.env.SKIP_ACTIVATION = buildParameters.skipActivation;
    process.env.PROJECT_PATH = buildParameters.projectPath;
    process.env.BUILD_PROFILE = buildParameters.buildProfile;
    process.env.BUILD_TARGET = buildParameters.targetPlatform;
    process.env.BUILD_NAME = buildParameters.buildName;
    process.env.BUILD_PATH = buildParameters.buildPath;
    process.env.BUILD_FILE = buildParameters.buildFile;
    process.env.BUILD_METHOD = buildParameters.buildMethod;
    process.env.VERSION = buildParameters.buildVersion;
    process.env.ANDROID_VERSION_CODE = buildParameters.androidVersionCode;
    process.env.ANDROID_KEYSTORE_NAME = buildParameters.androidKeystoreName;
    process.env.ANDROID_KEYSTORE_BASE64 = buildParameters.androidKeystoreBase64;
    process.env.ANDROID_KEYSTORE_PASS = buildParameters.androidKeystorePass;
    process.env.ANDROID_KEYALIAS_NAME = buildParameters.androidKeyaliasName;
    process.env.ANDROID_KEYALIAS_PASS = buildParameters.androidKeyaliasPass;
    process.env.ANDROID_TARGET_SDK_VERSION = buildParameters.androidTargetSdkVersion;
    process.env.ANDROID_SDK_MANAGER_PARAMETERS = buildParameters.androidSdkManagerParameters;
    process.env.ANDROID_EXPORT_TYPE = buildParameters.androidExportType;
    process.env.ANDROID_SYMBOL_TYPE = buildParameters.androidSymbolType;
    process.env.CUSTOM_PARAMETERS = buildParameters.customParameters;
    process.env.CHOWN_FILES_TO = buildParameters.chownFilesTo;
    process.env.MANUAL_EXIT = buildParameters.manualExit.toString();
    process.env.ENABLE_GPU = buildParameters.enableGpu.toString();
  }
}

export default HostBuilder;
