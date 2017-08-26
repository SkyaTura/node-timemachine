# [WIP] Node Timemachine

Dillinger is a simple nodejs tool to automate backups.

### Usage
Create a **.yaml** file inside the **projects/** directory, following the example:
```
namespace:
  cron: "* * * * *"
  drivers:
    mysqldump:
      - host: mysql
        user: root
        password: myVeryStrongPassword
        database: cooltables
```
This example will save a mysqldump from your `cooltables` database in your `mysql` host. The output dir is `storage/{namespace}/`

# Features
  - Set crons with linux crontab notation
  - Generate mysqldumps
  - Configure multiple tasks

# To Do
  - Dockerfile
  - A better documentation than this one you are reading now
  - New backup drivers
  - Store in cloud
  - Diff changes to store only data changes

# You can also:
  - Suggest features :)