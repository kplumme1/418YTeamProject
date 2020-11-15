# Depreciated - now using mongoAtlas instead of a local database

## MongoDB:
Cloud monitoring URL: https://cloud.mongodb.com/freemonitoring/cluster/SW5RTWOUXEKFRCHNYYZDFKDTE4X4KSBS  
See mongo security checklist: https://docs.mongodb.com/manual/administration/security-checklist/  


Installed according to:  
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/  

Mongo db versions "pinned" at install (no auto-updating)  
echo "mongodb-org hold" | sudo dpkg --set-selections  
echo "mongodb-org-server hold" | sudo dpkg --set-selections  
echo "mongodb-org-shell hold" | sudo dpkg --set-selections  
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections  
echo "mongodb-org-tools hold" | sudo dpkg --set-selections  
  
Data directory: /var/lib/mongodb  
Log directory: /var/log/mongodb  
Config file: /etc/mongod.conf  

The following changes were made to increase file size limit for mongo (according to https://medium.com/@muhammadtriwibowo/set-permanently-ulimit-n-open-files-in-ubuntu-4d61064429a)  
To increase the available limit to say 65535  
user@ubuntu:~$ sudo vim /etc/sysctl.conf  

add the following line to it  
fs.file-max = 65535  

run this to refresh with new config  
user@ubuntu:~$ sudo sysctl -p  

edit the following file  
user@ubuntu:~$ sudo vim /etc/security/limits.conf  

add following lines to it  
* soft     nproc          65535      
* hard     nproc          65535     
* soft     nofile         65535     
* hard     nofile         65535  
root soft     nproc          65535      
root hard     nproc          65535     
root soft     nofile         65535     
root hard     nofile         65535  

edit the following file  
user@ubuntu:~$ sudo vim /etc/pam.d/common-session  

add this line to it  
session required pam_limits.so  

 
