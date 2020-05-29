export const browserLocalDb = (db) => {
  return {
    executeSql: (sql, params) => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(sql, params, (tx, rs) => {
              resolve(rs);
            },
            (error) => {
              reject(error);
            });
        });
      });
    }
  };
};
