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

        // Waits for application load
        await utils.sleep(3000);

        // Assert correct prompt label
        const result = await odc.getValue({ keyPath: '#prompt.text' });

        expect(result.found, 'Keypath not found').to.be.true;
        expect(result.value).to.eql('Connect to Server');

        // SendClientDiscoveryBroadcast
    });
});