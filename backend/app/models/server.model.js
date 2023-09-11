const sql = require("./db.js");

// constructor
class Server {
  constructor(server) {
    this.ServerName = server.ServerName;
    this.IP = server.IP;
    this.Drive = server.Drive;
    this.Size = server.Size;
    this.SizeFree = server.SizeFree;
    this.SizeUsed = server.SizeUsed;
    this.PercentFree = server.PercentFree;
    this.TotalMemory = server.TotalMemory;
    this.FreeMemory = server.FreeMemory;
    this.UsedMemory = server.UsedMemory;
    this.OnlineVPS = server.OnlineVPS;
    this.OfflineVPS = server.OfflineVPS;
    this.LastUpdate = server.LastUpdate;
    this.ServerUptime = server.ServerUptime;
  }
  //Creates server if IP does not exist in DB else updates the Server with corresponding IP
  static create(newServer, result) {
    sql.query(
      `SELECT * FROM servers where IP = "${newServer.IP}"`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("Server already exists, Proceeding to update");
          sql.query(
            "UPDATE servers SET ServerName = ?, Drive = ?, Size = ?, SizeFree = ?, SizeUsed = ?, PercentFree = ?, TotalMemory = ?, FreeMemory = ?, UsedMemory = ?, OnlineVPS = ?, OfflineVPS = ?, LastUpdate = ?, ServerUptime = ? WHERE IP = ?",
            [
              newServer.ServerName,
              newServer.Drive,
              newServer.Size,
              newServer.SizeFree,
              newServer.SizeUsed,
              newServer.PercentFree,
              newServer.TotalMemory,
              newServer.FreeMemory,
              newServer.UsedMemory,
              newServer.OnlineVPS,
              newServer.OfflineVPS,
              newServer.LastUpdate,
              newServer.ServerUptime,
              newServer.IP,
            ],
            (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
              }

              if (res.affectedRows == 0) {
                // not found server with the id
                result({ kind: "not_found" }, null);
                return;
              }

              console.log("updated server: ", {
                IP: newServer.IP,
                ...newServer,
              });
              result(null, { IP: newServer.IP, ...newServer });
            }
          );
        } else {
          sql.query("INSERT INTO servers SET ?", newServer, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }

            console.log("Added server: ", { id: res.insertId, ...newServer });
            result(null, { id: res.insertId, ...newServer });
          });
        }
      }
    );
  }
  //Finds one Server with the same ID
  static findById(id, result) {
    sql.query(`SELECT * FROM servers WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found server: ", res[0].IP);
        result(null, res[0]);
        return;
      }

      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
  }
  //Returns all servers
  static getAll(IP, result) {
    let query = "SELECT * FROM servers";

    if (IP) {
      query += ` WHERE IP LIKE '%${IP}%'`;
    }

    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("Servers: ", res);
      result(null, res);
    });
  }
  //Still thinking what to do about this
  static getAllPublished(result) {
    sql.query("SELECT * FROM servers WHERE published=true", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("Servers: ", res);
      result(null, res);
    });
  }
  //Updates one server by ID
  static updateById(id, server, result) {
    sql.query(
      "UPDATE servers SET ServerName = ?, Drive = ?, Size = ?, SizeFree = ?, SizeUsed = ?, PercentFree = ?, TotalMemory = ?, FreeMemory = ?, UsedMemory = ?, OnlineVPS = ?, OfflineVPS = ?, LastUpdate = ?, ServerUptime = ? WHERE id = ?",
      [
        server.ServerName,
        server.Drive,
        server.Size,
        server.SizeFree,
        server.SizeUsed,
        server.PercentFree,
        server.TotalMemory,
        server.FreeMemory,
        server.UsedMemory,
        server.OnlineVPS,
        server.OfflineVPS,
        server.LastUpdate,
        server.ServerUptime,
        id,
      ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found server with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated server: ", { id: id, ...server });
        result(null, { id: id, ...server });
      }
    );
  }
  //Removes one server by ID
  static remove(id, result) {
    sql.query("DELETE FROM servers WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found server with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted server with id: ", id);
      result(null, res);
    });
  }
  //Removes all Servers from DB
  static removeAll(result) {
    sql.query("DELETE FROM servers", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log(`deleted ${res.affectedRows} servers`);
      result(null, res);
    });
  }
}

module.exports = Server;
