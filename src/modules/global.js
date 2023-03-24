let apiserver_hostname;

function isLocalHost(url) {
  return url.indexOf('localhost') !== -1 || url.indexOf('127.0.0.1') !== -1 || url.indexOf('192.') !== -1;
}

if(isLocalHost(window.location.hostname)){
  apiserver_hostname = "http://192.168.1.38:3000/";
}else{
  apiserver_hostname = "https://meditations-backend.deqstudio.com/";
}


const data = {
  api: {
    hostname: apiserver_hostname
  }
}

module.exports = data;