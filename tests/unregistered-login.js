const assert = require('assert');
const fs = require('fs');
const src = fs.readFileSync(require('path').join(__dirname,'..','server','server.js'),'utf8');
assert(src.includes('No VALVIMART account exists for this Google email. Please register an account first.'));
const loginBlock = src.slice(src.indexOf('if(req.method==="POST" && p==="/api/auth/login")'), src.indexOf('if(req.method==="POST" && p==="/api/auth/login/verify")'));
assert(loginBlock.includes('if(!u) return json(res,401,{error:"Incorrect login details"});'));
assert(loginBlock.includes('verifyPassword(password,u)'));
console.log('Unregistered-login regression checks passed.');
