'use strict';

var base = 'https://api.dubtrack.fm/';

class RoomQueueProtocol {
  constructor() {
  }

  info(roomid, detailed, callback) {
    if (detailed !== undefined) {
      if (detailed.constructor === Function) {
        callback = detailed;
        detailed = false;
      }
    } else {
      detailed = false;
    }

    return fetch(base + 'room/' + roomid + '/playlist' + (details ? '/details' : ''))
      .then(res => res.json())
      .then(json => {
        console.log('json in queue.info()');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }

  currentSong(roomid) {
    return fetch(base + 'room/' + roomid + '/playlist/active')
      .then(res => res.json())
      .then(json => {
        console.log('json in queue.currentSong()');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });
  }

  currentSongDubs(roomid, callback) {
    return fetch(base + 'room/' + '/playlist/active/dubs')
      .then(res => res.json())
      .then(json => {
        console.log('json in queue.currentsongdubs()');
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });

    // this.request({
    //   method: 'GET',
    //   url: 'room/' + roomid + '/playlist/active/dubs'
    // }, function (error, response, body) {
    //   if (callback != undefined) callback(body.data);
    // });
  }

  skip(roomid, songid, callback) {
    let obj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
      }
    };

    return fetch(base + 'chat/skip/' + roomid + '/' + songid, obj)
      .then(res => res.json())
      .then(json => {
        console.log('json from skip post')
        console.log(json);
        return json;
      })
      .catch(e => {
        console.log(e);
      });

    // this.request({
    //   method: 'POST',
    //   url: 'chat/skip/' + roomid + '/' + songid
    // }, function (error, response, body) {
    //   if (callback != undefined) callback(body);
    // });
  }

//TODO check from here


  /* TODO
   reorder(roomid, newOeder, callback) {

   this.request({
   method: '',
   url: ''
   }, function(error, response, body){
   if (callback != undefined) callback(body);
   });
   }
   //*/

  removeUserSong(roomid, userid, callback) {
    this.request({
      method: 'DELETE',
      url: 'room/' + roomid + '/queue/user/' + userid
    }, function (error, response, body) {
      if (callback != undefined) callback(body);
    });
  }

  removeDJ(roomid, userid, callback) {
    this.request({
      method: 'DELETE',
      url: 'room/' + roomid + '/queue/user/' + userid + '/all'
    }, function (error, response, body) {
      if (callback != undefined) callback(body);
    });
  }

  pauseState(roomid, userid, paused, callback) {
    this.request({
      method: 'PUT',
      url: 'room/' + roomid + '/queue/user/' + userid + '/pause',
      form: {
        pause: paused ? '1' : '0'
      }
    }, function (error, response, body) {
      if (callback != undefined) callback(body);
    });
  }

  join(roomid, userid, callback) {
    pauseState(roomid, userid, false, callback);
  }

  leave(roomid, userid, callback) {
    pauseState(roomid, userid, true, callback);
  }

  vote(roomid, userid, dub, callback) {
    this.request({
      method: 'POST',
      url: 'room/' + roomid + '/playlist/' + songid + '/dubs',
      form: {
        type: (dub.constructor === String ? dub : (dub ? 'updub' : 'downdub'))
      }
    }, function (error, response, body) {
      if (callback != undefined) callback(body);
    });
  }

  lockState(roomid, locked, callback) {
    this.request({
      method: 'POST',
      url: 'room/' + roomid + '/lockQueue',
      form: {
        lockQueue: locked ? '1' : '0'
      }
    }, function (error, response, body) {
      if (callback != undefined) callback(body);
    });
  }

  lock(roomid, callback) {
    lockState(roomid, true, callback);
  }

  unlock(roomid, callback) {
    lockState(roomid, false, callback);
  }
}

module.exports = RoomQueueProtocol;
