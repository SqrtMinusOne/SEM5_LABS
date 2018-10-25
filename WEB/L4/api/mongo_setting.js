// @flow

const mongoose = require('mongoose');
const Setting = require('../models/setting');

function saveSettings(setting_data) {
    setting_data.name = "main_setting";
    return new Setting(setting_data).save();
}

function getSettings() {
    return Setting.findOne({name: "main_setting"});
}

function deleteSettings(){
    return Setting.deleteMany({}, (err)=>{
        if (err){
            return Promise.reject(err)
        }
        else
            return Promise.resolve();
    });
}

module.exports = {saveSettings, getSettings, deleteSettings};