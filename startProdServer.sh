#

#
# doc: https://github.com/foreverjs/forever
#

# -w watch file changes. optional.
# -a append log
# -m 10 : start a max of 10 times
# watch is causing space overflow on files in node_modules, so disabled

forever start -a  -l forever.log -o out.log -e err.log backend/server.js


#
# to stop
# forever stop backend/server.js
