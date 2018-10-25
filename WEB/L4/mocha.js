const assert = require("assert");
const mongoose = require("mongoose");
const mongoS = require("./api/mongo_setting");
const mongoP = require("./api/mongo_pictures");
const mongoU = require("./api/mongo_user");

beforeEach(async ()=>{
    await mongoose.connect('mongodb://localhost:27017/web_l4');
});


describe("mongoS", ()=>{
   it("Доступность настроек", ()=>{
       mongoS.getSettings().then((settings)=>{
           assert.notEqual(settings.time, undefined);
           assert.notEqual(settings.sell_timeout, undefined);
           assert.notEqual(settings.info_interval, undefined);
           assert.notEqual(settings.date, undefined);
       });
   })
});

describe("mongoP", ()=>{

});
