const express = require("express");
import { request } from "graphql-request";
import database from "./database";
import {
  SYNC_STARTED,
  SYNC_RECEIVED,
  SYNC_FINISHED,
  SYNC_FAILED
} from "./src/constants";

import { loadConfig } from "./config/loadconfig";
import XeroConnection from "./xeroclient/XeroConnection";
const environment = process.env.environment || "developement";
const xeroConfig = loadConfig(environment);

const xero = new XeroConnection(xeroConfig);

const router = express.Router();

const insertSyncLogs = function(
  status = "Completed",
  records = 0,
  parent = 0,
  type = "Account",
  syncDataType = "sync"
) {
  return new Promise(function(resolve, reject) {
    let message = "";
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    var now = new Date();
    var period = now.getHours() >= 12 ? "PM" : "AM";

    switch (status) {
      case SYNC_STARTED:
        message = `Starting ${syncDataType} on ${days[now.getDay()]},  ${
          months[now.getMonth()]
        } ${now.getDate()}, ${now.getFullYear()}, at ${now.getDate()} : ${now.getMinutes()} : ${now.getMilliseconds()} ${period}`;
        break;
      case SYNC_RECEIVED:
        message = `Received ${records} files in ${syncDataType} on ${
          days[now.getDay()]
        },  ${
          months[now.getMonth()]
        } ${now.getDate()}, ${now.getFullYear()}, at ${now.getDate()} : ${now.getMinutes()} : ${now.getMilliseconds()} ${period}`;
        break;
      case SYNC_FINISHED:
        message = `Finised ${records} files in ${syncDataType} on ${
          days[now.getDay()]
        },  ${
          months[now.getMonth()]
        } ${now.getDate()}, ${now.getFullYear()}, at ${now.getDate()} : ${now.getMinutes()} : ${now.getMilliseconds()} ${period}`;
        break;
      case SYNC_FAILED:
        message = `Failed ${syncDataType} on ${days[now.getDay()]},  ${
          months[now.getMonth()]
        } ${now.getDate()}, ${now.getFullYear()}, at ${now.getDate()} : ${now.getMinutes()} : ${now.getMilliseconds()} ${period}`;
        break;
      default:
        message = `Completed ${syncDataType} on ${days[now.getDay()]},  ${
          months[now.getMonth()]
        } ${now.getDate()}, ${now.getFullYear()}, at ${now.getDate()} : ${now.getMinutes()} : ${now.getMilliseconds()} ${period}`;
    }
    var syncSql = `INSERT INTO
          SyncLogs (Parent, SyncDataType, SyncType, SyncBy, SyncOn, Status, Message)
          VALUES (${parent}, '${syncDataType}', '${type}', 'Brijal Savaliya', NOW(), '${status}', '${message}')`;
    database.query(syncSql, function(err, result) {
      if (err) return reject(err);
      return resolve(result.insertId);
    });
  });
};

const truncateAccount = function(){
  var truncateSql = `TRUNCATE TABLE Accounts`;
    database.query(truncateSql, function(err, result) {
      if (err) throw err;
    });
}

const truncateVendors = function(){
  var truncateSql = `TRUNCATE TABLE Vendors`;
    database.query(truncateSql, function(err, result) {
      if (err) throw err;
    });
}

const truncateSyncData = function(){
  var truncateSql = `TRUNCATE TABLE SyncLogs`;
    database.query(truncateSql, function(err, result) {
      if (err) throw err;
    });
}

router.get("/", (req, res, next) => {
  res.json("Routes");
});

router.get("/deleteData", async (req, res) => {
  truncateAccount();
  truncateVendors();
  truncateSyncData();
  res.json("Routes");
});

router.get("/syncData", async (req, res) => {
  let parentID = await insertSyncLogs();
  insertSyncLogs(SYNC_STARTED, 0, parentID);
  const query = `
        query {
          accounts {
            AccountID,
            Name,
            Code,
            Status,
            UpdatedDateUTC
          }
        }`;
  var accountData = await request("http://localhost:4000/graphql", query).then(
    data => data.accounts
  );
  let insertData = [];
  for (var i in accountData) {
    let tempInsertData = [];
    tempInsertData.push(null);
    tempInsertData.push(accountData[i].AccountID);
    tempInsertData.push(accountData[i].Name);
    tempInsertData.push(accountData[i].Code);
    tempInsertData.push(accountData[i].Status);
    tempInsertData.push(
      new Date(accountData[i].UpdatedDateUTC.match(/\d+/)[0] * 1)
    );
    insertData.push(tempInsertData);
  }
  database.beginTransaction(function(err) {
    truncateAccount();
    if (err) {
      throw err;
    }
    var sql =
      "INSERT INTO Accounts (id, AccountID, Name, Code, Status, UpdatedDateUTC ) VALUES ?";
    database.query(sql, [insertData], function(err) {
      if (err) {
        database.rollback(function() {
            insertSyncLogs(SYNC_FAILED, 0, parentID);
            throw err;
        });
      }
      insertSyncLogs(SYNC_RECEIVED, accountData.length, parentID);
    });
  });
  insertSyncLogs(SYNC_FINISHED, accountData.length, parentID);

  /*
  status = "Completed",
  records = 0,
  parent = 0,
  type = "Account",
  syncDataType = "sync" */

  let vendorParentID = await insertSyncLogs("Completed", 0, 0, "Vendor");
  insertSyncLogs(SYNC_STARTED, 0, vendorParentID, "Vendor");
  const vendorQuery = `
        query {
          contacts {
            ContactID,
            Name,
            AccountNumber,
            ContactStatus,
            UpdatedDateUTC
          }
        }`;
  var vendorData = await request("http://localhost:4000/graphql", vendorQuery).then(
    data => data.contacts
  );
  let insertVendorData = [];
  for (var i in vendorData) {
    let tempVendorInsertData = [];
    tempVendorInsertData.push(null);
    tempVendorInsertData.push(vendorData[i].ContactID);
    tempVendorInsertData.push(vendorData[i].Name);
    tempVendorInsertData.push(vendorData[i].AccountNumber);
    tempVendorInsertData.push(vendorData[i].ContactStatus);
    tempVendorInsertData.push(
      new Date(vendorData[i].UpdatedDateUTC.match(/\d+/)[0] * 1)
    );
    insertVendorData.push(tempVendorInsertData);
  }
  database.beginTransaction(function(err) {
    truncateVendors();
    if (err) {
      throw err;
    }
    var vendorSql =
      "INSERT INTO Vendors (id, ContactID, Name, AccountNumber, ContactStatus, UpdatedDateUTC ) VALUES ?";
    database.query(vendorSql, [insertVendorData], function(err) {
      if (err) {
        database.rollback(function() {
            insertSyncLogs(SYNC_FAILED, 0, vendorParentID, "Vendor");
            throw err;
        });
      }
      insertSyncLogs(SYNC_RECEIVED, vendorData.length, vendorParentID, "Vendor");
    });
  });
  insertSyncLogs(SYNC_FINISHED, vendorData.length, vendorParentID, "Vendor");

  res.json({vendor: vendorData.length, account:accountData.length});
});

router.get("/accounts", async (req, res) => {
  database.query(
    "SELECT id, AccountID, Name, Code, Status, UpdatedDateUTC FROM Accounts",
    (err, rows) => {
      if (err) throw err;
      res.json(rows);
    }
  );
});

router.get("/getSyncData/:id", async (req, res) => {
  var parentID = req.params.id;
  database.query(
    `SELECT id, Parent, SyncDataType, SyncType, SyncBy, SyncOn, Status, Message FROM SyncLogs WHERE Parent = ${parentID} ORDER BY id DESC`,
    (err, rows) => {
      if (err) throw err;
      res.json(rows);
    }
  );
});

router.get("/contacts", async (req, res) => {
  database.query(
    "SELECT id, ContactID, Name, AccountNumber, ContactStatus, UpdatedDateUTC FROM Vendors",
    (err, rows) => {
      if (err) throw err;
      res.json(rows);
    }
  );
});

module.exports = router;
