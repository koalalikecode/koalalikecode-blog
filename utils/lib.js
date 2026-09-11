module.exports = {
    formatDate : function(date) {
        let res = new Date(date);
        return (
          res.getDate() +
          "/" +
          (Number(res.getMonth()) + 1).toString() +
          "/" +
          res.getFullYear()
        );
      }
}