const assert = require("assert");
const mongoose = require("mongoose");
const mongoS = require("./src/api/mongo_setting");
const mongoP = require("./src/api/mongo_pictures");
const User = require("./models/user");
const mongoU = require("./src/api/mongo_user");

before(async function () {
    await mongoose.connect('mongodb://localhost:27017/web_l4');
});

describe("mongoS", function(){
    this.timeout(10000);
    let backup_settings = {"date":"2018-11-16","time":"10:00","sell_timeout":"00:05","info_interval":"00:02"};
    it("Доступность настроек", (done)=>{
        mongoS.getSettings().then((settings)=>{
            assert.notEqual(settings, null);
            assert.notEqual(settings.time, undefined);
            assert.notEqual(settings.sell_timeout, undefined);
            assert.notEqual(settings.info_interval, undefined);
            assert.notEqual(settings.date, undefined);
            backup_settings = settings._doc;
            done();
        }).catch((error)=>{
            done(error);
        });
    });
    it("Удаление настроек", (done) => {
        mongoS.deleteSettings().catch((error) => {
            done(error);
        }).then(()=>{
            mongoS.getSettings().then((settings) => {
                assert.equal(settings, null);
                done();
            }).catch((error) => {
                done(error);
            });
        });
    });
    it("Восстановление настроек", (done)=>{
        if (backup_settings._id)
            delete backup_settings._id;
        mongoS.saveSettings(backup_settings).then(()=>{
            done();
        }).catch((error)=>{
            done(error);
        });
    })
});

describe("mongoP", function(){
    this.timeout(10000);
    let backup_gallery =[];
    it("Доступность галереи", (done)=>{
        mongoP.returnGallery().then((gallery)=>{
            assert.notEqual(gallery, null);
            gallery.forEach((picture)=>{
                backup_gallery.push(picture._doc);
            });
            done();
        }).catch((error)=>{
            done(error);
        })
    });
    it("Добавление тестовой картины", (done)=>{
        let pict = {
            sold_price: 0,
            buyer: 'test_buyer',
            name: 'test_name',
            url: 'test_url',
            author: 'test_author',
            description: 'test_description',
            start_price: 1,
            min_step: 2,
            max_step: 3,
            for_auction: 1};
        mongoP.savePicture(pict).then(()=>{
            done();
        }).catch((error)=>{
            done(error);
        })
    });
    it("Поиск тестовой картины", (done)=>{
        mongoP.findPicture('test_name').then((picture)=>{
            assert.equal(picture.name, 'test_name');
            done();
        }).catch((error)=>{
            done(error);
        })
    });
    it("Удаление галереи", (done)=>{
        mongoP.deleteGallery().then(()=>{
            done();
        }).catch((error)=>{
            done(error);
        })
    });
    it("Восстановление галереи", (done)=>{
        backup_gallery.forEach(async (picture)=>{
            if (picture._id)
                delete picture._id;
            await mongoP.savePicture(picture)
        });
        done();
    })
});

describe("monogU", function () {
    this.timeout(10000);
    let test_user_data = {
        username: 'test',
        password: "test_password",
        name: 'Тест',
        is_admin: true
    };
    function test_user(user1, user2){
        assert.equal(user1.username, user2.username);
        assert.equal(user1.name, user2.name);
        assert.equal(user1.is_admin, user2.is_admin)
    }
    it("Создание пользователя", (done)=>{
        mongoU.createUser(test_user_data).then(()=>{done()}).catch((err)=>{done(err)});
    });
    it("Проверка тестового пользователя",(done)=>{
        mongoU.checkUser(test_user_data).then((res)=>{
            test_user(test_user_data, res);
            done();
        }).catch((error)=>{done(error)});
    });
    it("Удаление тестового пользователя", (done)=>{
        User.deleteOne({username: test_user_data.username}, (err)=>{done(err)});
    })
});
