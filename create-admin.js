const fs=require('fs'),path=require('path'),bcrypt=require('bcryptjs'),crypto=require('crypto');
const file=path.join(__dirname,'data','users.json');
if(!fs.existsSync(path.dirname(file)))fs.mkdirSync(path.dirname(file),{recursive:true});
if(!fs.existsSync(file))fs.writeFileSync(file,'[]');
(async()=>{
 const users=JSON.parse(fs.readFileSync(file,'utf8'));
 if(users.some(u=>u.role==='admin')){console.log('An administrator account already exists. For security, no default credentials were created. Use your existing admin account or reset its password.');return}
 const username='admin',email='admin@systemmonitoring.local',password='Admin@SHMS2026!';
 users.push({id:crypto.randomUUID(),fullName:'System Administrator',email,username,passwordHash:await bcrypt.hash(password,12),role:'admin',createdAt:new Date().toISOString()});
 fs.writeFileSync(file,JSON.stringify(users,null,2));
 console.log('Default administrator account created.');
 console.log('Username: '+username); console.log('Password: '+password);
 console.log('Change this password after first login. Do not expose this app to the public internet with default credentials.');
})().catch(e=>{console.error(e.message);process.exitCode=1});
