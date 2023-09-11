const sql = require("./db");

class BackupStatus {
  constructor(backupStatus) {
    this.IP = backupStatus.IP;
    this.Status = backupStatus.Status;
    this.LastUpdate = backupStatus.LastUpdate;
  }

  static create(newBackupStatus, result) {
    sql.query(
      `SELECT * FROM backupStatus where IP = "${newBackupStatus.IP}"`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("Backup Status already exist, Proceeding to update");
          sql.query(
            `UPDATE backupStatus SET Status = ?, LastUpdate = ? where IP = ?`,
            [
              newBackupStatus.Status,
              newBackupStatus.LastUpdate,
              newBackupStatus.IP,
            ],
            (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
              }

              if (res.affectedRows == 0) {
                // not found backupStatus entry with the id
                result({ kind: "not_found" }, null);
                return;
              }

              console.log("updated backupStatus: ", {
                IP: newBackupStatus.IP,
                ...newBackupStatus,
              });
              result(null, { IP: newBackupStatus.IP, ...newBackupStatus });
            }
          );
        } else {
          sql.query(
            "INSERT INTO backupStatus SET ?",
            newBackupStatus,
            (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
              }

              console.log("Added backupStatus: ", {
                id: res.insertId,
                ...newBackupStatus,
              });
              result(null, { id: res.insertId, ...newBackupStatus });
            }
          );
        }
      }
    );
  }

  // Get all backupStatus
  static getAll(IP, result) {
    let query = "SELECT * FROM backupStatus";

    if (IP) {
      query += ` WHERE IP LIKE '%${IP}%'`;
    }

    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("BackupStatus: ", res);
      result(null, res);
    });
  }
}

module.exports = BackupStatus;
