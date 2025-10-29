const glob = require("glob");
const chalk = require("chalk");
const shell = require("shelljs");
const Joi = require("joi");

const ENV_HOME = shell.pwd();
const directoryPath = `${ENV_HOME}/{i18n,configs}`;

const schema = Joi.any();

console.log(chalk.cyan(`processing json files...`));
const getDirectories = (src, callback) => glob(src + "/**/*.json", callback);

getDirectories(directoryPath, (err, files) => {
  if (err) {
    console.log(chalk.red(`Unable to scan directory: ${err}`));
    process.exit(0);
  } else {
    files.forEach((file) => {
      console.log(chalk.cyan(`processing ${file}...`));
      try {
        const json = require(file);
        const { error } = schema.validate(json);
        if (error) {
          console.log(chalk.red(`Unable to validate: ${file}`));
          console.log(chalk.red(error));
          process.exit(1);
        } else {
          console.log(chalk.green(`${file} is valid`));
        }
      } catch (error) {
        console.log(chalk.red(`Unable to load: ${file}`));
        console.log(chalk.red(error));
        process.exit(1);
      }
    });
  }
});
