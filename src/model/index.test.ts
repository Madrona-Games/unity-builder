interface ExportedModules {
  [key: string]: any;
  Action: any;
  BuildParameters: any;
  Cache: any;
  Docker: any;
  ImageTag: any;
  Input: any;
  Platform: any;
  Project: any;
  Unity: any;
}

import * as Index from '.';
const exportedModules: ExportedModules = Index;

describe('Index', () => {
  test.each(Object.keys(exportedModules))('exports %s', (exportedModule) => {
    expect(exportedModules[exportedModule]).toBeDefined();
  });
});
