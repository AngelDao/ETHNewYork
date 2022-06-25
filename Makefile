.PHONY: all test clean

ifndef m
override m = test
endif

all: prettier users test snapshot summary docgen
build :; forge build
test :; forge test -vvv --match-test $(m)
report :; forge test --gas-report -vvv --optimize
summary :; make report > .gas-report
snapshot :; forge snapshot --optimize
deps :; git submodule update --init --recursive
install :; npm install
prettier :; npm run prettier
