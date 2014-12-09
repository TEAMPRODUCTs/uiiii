if not exist .\node_modules (goto install) else (goto package)

:install 
call npm install colors
call npm install vm
call npm install url
call npm install path
call npm install mkdirp
call npm install jsdom
call npm install CSSOM
call npm install util
call npm install esprima
call npm install os
echo "npm intall completed"

:package
node busbu.js --path=busbu.json
