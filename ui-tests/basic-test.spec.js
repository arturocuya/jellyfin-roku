import { ecp, device, utils, odc } from "roku-test-automation";
import { expect } from 'chai';

describe('basic test', () => {
    before(async function () {
        // Load RTA configuration
        utils.setupEnvironmentFromConfigFile('./ui-tests/rta-config.json');
    });

    it('gets connect to server title', async () => {
        // Launch Jellyfin app
        await device.deploy({
            project: './bsconfig-rta.json',
            stagingDir: './build/rta',
            rootDir: './build/staging',
            deleteBeforeInstall: true,
            files: [
                "manifest",
                "source/**/*.*",
                "components/**/*.*",
                "images/**/*.*",
                "resources/**/*.*",
                "locale/**/*.*",
                "settings/*.*"
            ]
        });

        await utils.sleep(3000);
        await odc.deleteEntireRegistry();

        await ecp.sendLaunchChannel();
        await utils.sleep(5000);

        await ecp.sendKeypress(ecp.Key.Ok);
        await ecp.sendText('https://demo.jellyfin.org/stable/');
        await ecp.sendKeypress(ecp.Key.Down, { count: 4 });
        await ecp.sendKeypress(ecp.Key.Ok);
        await utils.sleep(100);
        await ecp.sendKeypress(ecp.Key.Down);
        await ecp.sendKeypress(ecp.Key.Ok);

        await utils.sleep(2000);
        await ecp.sendKeypress(ecp.Key.Ok);
        await ecp.sendText('demo');
        await ecp.sendKeypress(ecp.Key.Down, { count: 4 });
        await ecp.sendKeypress(ecp.Key.Ok);
        await utils.sleep(1000);

        await ecp.sendKeypress(ecp.Key.Down, { wait: 1000 });
        await ecp.sendKeypress(ecp.Key.Down, { wait: 100 });
        await ecp.sendKeypress(ecp.Key.Down, { wait: 100 });
        await ecp.sendKeypress(ecp.Key.Ok);
    });
});