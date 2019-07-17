exports.install = function (Vue, options) {
    Vue.prototype.Jurisdiction = function (str){
        if(JSON.parse(localStorage.getItem('SET_ROLES')) == ''){

        }else{
            return JSON.parse(localStorage.getItem('SET_ROLES')).some(role => str == role)
        }

    };
};