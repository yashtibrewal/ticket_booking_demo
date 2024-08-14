const Base = require('mocha/lib/reporters/base');
const path = require('path');
const chalk = require('chalk'); // Import chalk for colored output

class CustomReporter extends Base {
    constructor(runner) {
        super(runner);

        // Define colors and symbols
        const green = chalk.green;
        const red = chalk.red;
        const yellow = chalk.yellow;
        const blue = chalk.blue;
        const tick = green('✔');
        const cross = red('✘');
        const info = blue;

        let printedFolders = new Set();

        // Print folder name when a suite starts
        runner.on('suite', (suite) => {
            if (suite.file && !printedFolders.has(suite.file)) {
                const folderName = path.basename(path.dirname(suite.file));
                console.log(chalk.magenta(`\nFolder: ${folderName}`));
                printedFolders.add(suite.file);
            }
        });
        runner.on('start', () => {
            console.log(info('Test run started'));
        });

        runner.on('suite', (suite) => {
            if (suite.title != '');
            console.log(info(`  Suite: ${suite.title}`));
        });

        runner.on('test', (test) => {
            console.log(chalk.cyanBright(`   Test: ${test.title}`));
        });

        runner.on('pass', (test) => {
            console.log(`    ${tick} ${green(`Pass: ${test.title}`)}`);
        });

        runner.on('fail', (test, err) => {
            console.log(`    ${cross} ${red(`Fail: ${test.title} - ${err.message}`)}`);
        });

        runner.on('end', () => {
            console.log(info('\nAll tests completed'));
        });
    }
}

module.exports = CustomReporter;
