import fs from 'fs';
import path from 'path';

export function loadConfig(environment) {
    const configsPath = path.resolve(process.cwd(), 'config', environment);
    const xeroConfigJson = fs.readFileSync(path.resolve(configsPath, 'config.json'));

    const xeroConfig = JSON.parse(xeroConfigJson);

    xeroConfig.privateKeyPath = path.resolve(process.cwd(), xeroConfig.privateKeyPath);

    return xeroConfig
};