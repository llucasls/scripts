PYTHON = python3
VENV   = $(CURDIR)/.venv
PIP    = $(VENV)/bin/$(PYTHON) -m pip

CC = cc

MAKEFLAGS := -j -Orecurse

EXT = .py

IS_EXEC = $(shell if stat -c '%a' $1 | grep -qE '^[4-7]'; then echo $1; fi)

BIN_DIR := $(abspath $(CURDIR)/../../bin)

define SRC_FILES
$(strip
	$(foreach FILE, $(wildcard *$(EXT)),
		$(call IS_EXEC,$(FILE))
	)
)
endef

LINKS_TXT = $(file < links.txt)

define LINKED_FILES
$(strip
	$(foreach FILE, $(LINKS_TXT),
		$(firstword
			$(subst :, ,$(FILE))
		)
	)
)
endef

# create link names from links.txt
define OUT_FILES :=
$(strip
	$(foreach FILE, $(LINKS_TXT),
		$(word 2,
			$(subst :, ,$(FILE))
		)
	)
)
endef

# add files that are not listed in links.txt
define OUT_FILES +=
$(strip
	$(basename
		$(subst _,-,
			$(filter-out $(LINKED_FILES),
				$(SRC_FILES)
			)
		)
	)
)
endef

# get output files and return corresponding source from links.txt
GET_LINKED_SRC = $(firstword $(subst :, ,$(filter %:$1,$(file < links.txt))))

# either get source name from links.txt or use subst on link's name
define GET_SRC
$(strip
	$(if $(call GET_LINKED_SRC,$1),
		$(call GET_LINKED_SRC,$1),
		$(subst -,_,$1)$(EXT)
	)
)
endef

TARGET_FILES := $(foreach FILE,$(OUT_FILES),$(BIN_DIR)/$(FILE))

all: install link

install: $(VENV)

link: $(TARGET_FILES)

unlink: | $(BIN_DIR)
	rm -f $(TARGET_FILES)

$(BIN_DIR):
	mkdir -p $@

$(VENV): requirements.txt
	if test ! -d "$@"; then $(PYTHON) -m venv "$@"; fi
	$(PIP) install --upgrade pip
	$(PIP) install --upgrade -r $<
	touch "$@"

$(TARGET_FILES): | $(BIN_DIR) $(VENV)
	printf '#!%s\n' $(abspath .venv/bin/python3) > "$@"
	cat < "$(call GET_SRC,$(@F))" >> "$@"
	chmod 755 "$@"

.PHONY: all install link unlink

.SILENT: install unlink $(TARGET_FILES)
