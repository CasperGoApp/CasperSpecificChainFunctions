# CasperGo Version 0.1 - Update

## Milestone 4

This repository is to be added to the base for the CasperGo Version of the LetsGo Mobile Wallet Platform, customized and White-labeled for Casper.

### Setup Servers

#### Coin Servers

1.  CSPR

    1.  [Install Base Server Software](#how-to-install-server-software)
        1. Follow the instructions here: [Install Base Server Software](#how-to-install-server-software)
        2. [Install CSPR block monitors](#how-to-install-cspr-software)

### How To Install Server Software

Setup a new Ubuntu Server and follow the steps below to follow the initial installation of the services.

#### Step 1:

Change the SSH Port Number, open an SSH connection to the server and edit the following file. You need to locate the line in the file, "#Port 22" and then uncomment (By removing the leading # character) it and change the value with a private port number (for example, 2178)

##### Nano

```bash
nano /etc/ssh/sshd_config
```

##### VIM

```bash
vim /etc/ssh/sshd_config
```

#### Step 2:

Open an SSH connection to the server and run the following command which will set a server name as the localhost on the server.

Note: You must replace WEBHOST.COM with the domain name chosen for this service.

```bash
echo "WEBHOST.COM" > /etc/hostname
```

#### Step 3:

Open an SSH connection to the server and run the following command which will install base software for supporting services and reboot the server.

```bash
apt update ; apt -y upgrade ; apt -y autoremove ; apt install -y nodejs npm certbot nginx python3-certbot-nginx git ; npm install -g pm2 ; pm2 startup ; reboot
```

### How to Install CSPR Block Monitor

#### Step 1: Connect Watch Addresses

Start by adding a JSON file for the address list. Update this file then add an update to [coin name].updateAddressList to trigger a reload before processing.

```bash
echo '{}' > /LOCAL_DIRECTORY/blockMonitor/src/casper/addressList
```

#### Step 2: Start Process in PM2

```bash
pm2 start /LOCAL_DIRECTORY/src/server.js
pm2 save
```

### How to Update the Block Monitor Lists in Real-Time

Updating the block monitor lists will help the system ensure you are providing real-time updates of data to users.

```bash
echo '{"account-hash-5a451d2c2a5c126aeb1989446a973053520039e04a1cbc00dfd7ad8aa4990062":true}' > /LOCAL_DIRECTORY/blockMonitor/src/casper/addressList
echo '1' > /LOCAL_DIRECTORY/blockMonitor/src/casper/updateAddressList
```

### Next Steps

Merge this repository with the ChatBotAPI. Specific Casper Blockchain Account management and functions are located in src/coins/blockchain/casper.js and will be available by the core processing module.

## Acknowledgments

| Name           | Link                                                       |
| -------------- | ---------------------------------------------------------- |
| node-fetch     | https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API |
| casper-js-sdk  | https://github.com/casper-ecosystem/casper-js-sdk          |
| casper-storage | https://github.com/CasperDash/casper-storage               |
