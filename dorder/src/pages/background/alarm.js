
export const createAlarm = (state) => {
    return new Promise(resolve => {
        var alarm = {};
        alarm.name = 'order-alarm';
        alarm.date = state.alarm.date;
        alarm.time = state.alarm.time;
        
        console.log("name ", alarm.name, "date ", alarm.date, "time ", alarm.time);

        var now = new Date().getTime();
        var alarmDate = new Date(alarm.date + ' ' + alarm.time + ':00').getTime();
        if (alarmDate > now) { 
            // create alarm
            chrome.alarms.create(alarm.name, {when: alarmDate});
            var alarms_arr = [];
            chrome.storage.local.get('alarms', function (data) {
                console.log("알람등록", data);
                if (typeof data.alarms !== 'undefined') {
                    data.alarms.push(alarm);
                    alarms_arr = data.alarms;
                } else {
                    alarms_arr.push(alarm);
                }
                chrome.storage.local.set({'alarms': alarms_arr}, function () {
                    //self.getAlarms();
                    console.log("알람이 설정되었습니다.");
                    resolve(true);
                });
            });
        } else {
            //alert("알람시간을 다시 확인해주세요.");
            resolve(false);
        }
    });
}

export const deleteAlarm = () => {
    return new Promise(resolve => {
        chrome.alarms.clearAll(function () {
            var alarms = [];
            chrome.storage.local.set({'alarms': alarms}, function () {
                resolve("All of alarm clear");
            }); 
        });
    });
}

export const getAlarm = () => {
    return new Promise(resolve => {
        chrome.storage.local.get('alarms', function (data) {
            if (typeof data.alarms !== 'undefined' && data.alarms.length > 0) {
                resolve(data);
            }
        });
    });
}

/*

    deleteAlarm(alarmName, callback) {
        var self = this;
        chrome.alarms.clear(alarmName, function () {            
            chrome.storage.local.get('alarms', function (data) {

                var alarms = data.alarms;
                for (var i = 0; i < data.alarms.length; i++) {
                    if (alarmName == data.alarms[i]['name']) {
                        alarms.splice(i, 1);
                        chrome.storage.local.set({'alarms': alarms}, function () {
                            callback();
                        });   
                    }
                }
            });
        });
    }

    getAlarms() {
        var self = this;
        chrome.storage.local.get('alarms', function (data) {

            if (typeof data.alarms !== 'undefined' && data.alarms.length > 0) {
                data.alarms.reverse();
                console.log("storage.local.get:", data.alarms);
                // set alarms status
                chrome.alarms.getAll(function(alarms) {
                    console.log("alarms.getAll", alarms);
                    for (var i = 0; i < data.alarms.length; i++) {
                        data.alarms[i]['status'] = 'off';
                        for (var j = 0; j < alarms.length; j++) {
                            if (alarms[j]['name'] == data.alarms[i]['name']) {
                                data.alarms[i]['status'] = 'on';
                            }
                        }
                    }

                    // set content
                    var alarmsHTML = '';
                    for (var i = 0; i < data.alarms.length; i++) {

                        var name = data.alarms[i]['name'];
                        var nameFull = data.alarms[i]['name'];
                        var date = data.alarms[i]['date'];
                        var time = data.alarms[i]['time'];
                        var status = data.alarms[i]['status'];
                        var image = data.alarms[i]['image'];
                        var videoTitle = data.alarms[i]['videoTitle'];

                        console.log(new Date(date + ':00'));

                        if (name.length > 19) {
                            name = name.substring(0, 19) + '..';
                        }

                        if (videoTitle.length > 30) {
                            videoTitle = videoTitle.substring(0, 30) + '..';
                        }

                        alarmsHTML += '<li class="row '+ name +'">' +
                        '<div class="image">\n' +
                            '<img src="'+ image +'">\n' +
                        '</div>\n' +
                        '<div class="info">\n' +
                            '<p class="alarm-name" title="'+ nameFull +'">'+ name +'</p>\n' +
                            '<p class="video-title">'+ videoTitle +'</p>\n' +
                            '<p class="alarm-date">'+ date +'</p>\n' +
                            '<p class="status '+ status +'"></p>\n' + 
                        '</div>\n' +
                        '<div class="time">\n' +
                            '<p>'+ time +'</p>'
                        '</div>\n' +
                        '</li>\n';
                    }

                    $('.alarms-list').html(alarmsHTML);
                    $('.no-alarm').hide();

                    // bind click event to alarms
                    $('.alarms-list li.row').click(function () {
                        var alarmName = $(this).attr('class').replace('row ', '');
                        self.updateAlarm(alarmName);
                    });

                    self.goBack();
                    $('.loader').hide();
                });

            } else {
                $('.no-alarm').show();
                $('.loader').hide();
            }
        });
    }

    pad(value) {
        return value.toString().length > 1 ? value : '0' + value;
    }

    */