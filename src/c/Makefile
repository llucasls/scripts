CC := gcc
CFLAGS := -Wall -Wextra -Werror

BIN_DIR := $(abspath $(CURDIR)/../../bin)
LIB_DIR := $(abspath $(CURDIR)/../../lib)

EXT := .c

SRC_FILES := $(wildcard *$(EXT))
SRC_LIBS := $(wildcard lib/*$(EXT))

TARGET_FILES := $(SRC_FILES:%.c=$(BIN_DIR)/%)
TARGET_LIBS := $(patsubst lib/%.c,$(LIB_DIR)/%.o,$(SRC_LIBS))
EXTRA_FILES := xinitrc
EXTRA := $(patsubst %,$(BIN_DIR)/%,$(EXTRA_FILES))

CONFIG = CFLAGS="$(CFLAGS)" LDFLAGS="$(LDFLAGS)" -f config.mk

link: $(TARGET_LIBS) $(TARGET_FILES) $(EXTRA)

unlink: | $(BIN_DIR)
	rm -f $(TARGET_FILES) $(TARGET_LIBS) $(EXTRA)

$(BIN_DIR)/%: %.c | $(BIN_DIR)
	@$(CC) $(CFLAGS) -o $@ $<

$(LIB_DIR)/%.o: lib/%.c | $(LIB_DIR)
	@$(CC) $(CFLAGS) -o $@ -c $<

$(BIN_DIR):
	mkdir -p $@

$(LIB_DIR):
	mkdir -p $@

$(BIN_DIR)/xinitrc: $(LIB_DIR)/main.o $(LIB_DIR)/run.o
	@$(CC) $(CFLAGS) -o $@ $^

# volume: volume.c
# 	$(CC) -o $@ $^ -lm -lasound

notify-me: notify_me.c
	@$(MAKE) --no-print-directory $(CONFIG) $@

.PHONY: link unlink

.SILENT: unlink $(TARGET_FILES)
