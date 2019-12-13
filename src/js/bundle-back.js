!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=8)}([function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("config")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("bcryptjs")},function(e,t){e.exports=require("lodash")},function(e,t){e.exports=require("jsonwebtoken")},function(e,t,n){const r=n(0),o=n(7),s=n(1),i=n(5),a=new r.Schema({email:{type:String,unique:!0,minlength:5,maxlength:63,required:!0},registrationDate:{type:Date,default:Date.now},password:{type:String,required:!0,minlength:7,maxlength:1024}});a.methods.generateAuthToken=function(){return i.sign({_id:this._id},s.get("jwtPrivateKey"))};const u=r.model("User",a);t.User=u,t.validate=function(e){const t={email:o.string().min(5).max(63).required().email(),date:o.date(),password:o.string().min(7).max(255).required()};return o.validate(e,t)}},function(e,t){e.exports=require("joi")},function(e,t,n){e.exports=n(9)},function(e,t,n){const r=n(1),o=n(0),s=n(10),i=n(11),a=n(13),u=n(2),d=u();r.get("jwtPrivateKey")||(console.log("FATAL ERROR: jwtPrivateKey is not defined"),process.exit(1)),o.connect("mongodb://localhost/to_do_list",{useUnifiedTopology:!0,useCreateIndex:!0,useNewUrlParser:!0}).then(()=>console.log("connected")).catch(e=>console.error("could not connect",e)),d.use(u.json()),d.use(s()),d.use("/api/users",i),d.use("/api/auth",a);const c=process.env.PORT||8080;d.listen(c,()=>console.log(`listening on port ${c}...`))},function(e,t){e.exports=require("cors")},function(e,t,n){const r=n(3),o=n(4),s=n(12),{User:i,validate:a}=n(6),u=(n(0),n(2).Router());u.post("/",async(e,t)=>{const{error:n}=a(e.body);if(n)return t.status(400).send(n.details[0].message);let s=await i.findOne({email:e.body.email});if(s)return t.status(400).send("User already registered.");s=new i(o.pick(e.body,["email","password"]));const u=await r.genSalt(10);s.password=await r.hash(s.password,u),await s.save();const d=s.generateAuthToken();t.header("x-auth-token",d).send(o.pick(s,["_id","email"]))}),u.get("/me",s,async(e,t)=>{const n=await i.findById(e.user._id);t.send(o.pick(n,["_id","email"]))}),e.exports=u},function(e,t,n){const r=n(5),o=n(1);e.exports=function(e,t,n){const s=e.header("x-auth-token");if(!s)return t.status(401).send("Access denied. No token provided.");try{const t=r.verify(s,o.get("jwtPrivateKey"));e.user=t,n()}catch(e){t.status(400).send("Invalid token")}}},function(e,t,n){const r=n(3),o=n(7),{User:s}=(n(4),n(6)),i=(n(0),n(2).Router());i.post("/",async(e,t)=>{const{error:n}=function(e){const t={email:o.string().min(5).max(63).required().email(),password:o.string().min(7).max(255).required()};return o.validate(e,t)}(e.body);if(n)return t.status(400).send(n.details[0].message);let i=await s.findOne({email:e.body.email});if(!i)return t.status(400).send("Invalid email or passwword.");if(!await r.compare(e.body.password,i.password))return t.status(400).send("Invalid email or passwword.");const a=i.generateAuthToken();t.send(a)}),e.exports=i}]);