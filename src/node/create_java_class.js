#!/usr/bin/env node
const fs = require("fs");
const { basename } = require("path");
const { _: classes, ...options } = require("minimist")(process.argv.slice(2));

const dirname = basename(process.env.PWD);

const packageName = options.package || options.p;
const code = (packageName, className) => {
  if (packageName) {
    return `package ${packageName};

public class ${className} {

    public static void main(String[] args) {

    }
}\n`;
  }

  return `public class ${className} {

    public static void main(String[] args) {

    }
}\n`;
}

function handleClasses(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
}

classes
  .map((className) => [`${className}.java`, basename(className)])
  .forEach(([file, className]) => fs.writeFile(file, code(packageName, className),
    { encoding: "utf-8", mode: 0o644, flag: "w" }, handleClasses))
