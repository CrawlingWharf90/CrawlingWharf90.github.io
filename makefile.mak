clear:#remove all css files
	del /Q static\\css\\*.css
	del /Q static\\css\\*.css.map

rm: #remove a specific css file
	del /Q static\\css\\${file}.css
	del /Q static\\css\\${file}.css.map

# Compile a specific SCSS file to CSS
style:
	cd static/css && sass $(file).scss $(file).css

# Compile all SCSS files to CSS
styles:
	cd static/css && sass --update .

# Use the first argument after `make style` as the filename
file := $(word 2, $(MAKECMDGOALS))

# Prevent make from interpreting <filename> as a target
%:
	@:
