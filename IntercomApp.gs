function connect(app_id, app_secret){
  return new Intercom(app_id, app_secret);
};

function Intercom(app_id, app_secret){
  this.app_id = app_id;
  this.app_secret = app_secret;
}

Intercom.prototype._run = function(url, payload, method){
  var headers = {
    'Authorization':'Basic ' + Utilities.base64Encode(this.app_id + ":" + this.app_secret),
    "Accept": 'application/json'
  };
  if(!method) {
    method = "post";
  }
  var options = {
    "method" : method,
    "contentType": 'application/json',
    "headers": headers,
     muteHttpExceptions: true,
    "payload": JSON.stringify(payload)
  }
  return UrlFetchApp.fetch(url, options);
}

Intercom.prototype.updateUser = function(data){
  var url = "https://api.intercom.io/users";
  return JSON.parse(this._run(url, data).getContentText());
};


Intercom.prototype.updateUsers = function(data){
  var url = "https://api.intercom.io/users/bulk";
  
  //Logger.log("calling");
  //var request = UrlFetchApp.getRequest(url, options);
  
  var result = UrlFetchApp.fetch(url, options);
  
  //Logger.log(request);
  Logger.log(result.getContentText());
};


Intercom.prototype.tagUserList = function(tag, user_list){
  var data = {"name":tag};
  data["users"] = user_list;
  var url = "https://api.intercom.io/tags";
  return JSON.parse(this._run(url, data).getContentText());
};


Intercom.prototype.untagUserList = function(tag, user_list){
  for (var i=0; i<user_list.length; i++){
    user_list[i]["untag"] = true;
  }
  return this.tagUserList(tag, user_list);
};
