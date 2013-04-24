REPORTER ?= list
all: build
build:
	grunt dist

test:
	mocha --reporter $(REPORTER) test/*

.PHONY: test
