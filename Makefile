bin-dir = ./node_modules/.bin/
name = frp-api

.PHONY: run stop test

run:
	$(bin-dir)pm2 start index.js --name="$(name)" || $(bin-dir)pm2 restart $(name)

stop:
	$(bin-dir)pm2 stop $(name)

test:
	$(MAKE) run
	$(bin-dir)jasmine ./*test*.js || $(MAKE) stop

