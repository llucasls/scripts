#!/usr/bin/env python
import sys
import json

import toml


def read_input():
    if sys.stdin.isatty():
        sys.exit(1)
    else:
        return sys.stdin.read().strip()


def read_toml():
    pass


def write_toml(obj):
    return toml.dumps(json.loads(obj.replace("'", '"'))).strip()


def main():
    print(write_toml(read_input()))


if __name__ == "__main__":
    sys.exit(main())