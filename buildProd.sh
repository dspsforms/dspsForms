#
# ng build --aot --environment=prod --output-hashing=all --sourcemaps=false --extract-css=true --named-chunks=false --build-optimizer=true


# environment has changed to configuration
# also other changes, see https://github.com/angular/angular-cli/issues/10676

ng build --aot --configuration=production --output-hashing=all --source-map=true --extract-css=true --named-chunks=false --build-optimizer=true --optimization=false



# see https://github.com/angular/angular-cli/issues/9340
