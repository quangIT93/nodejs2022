module.exports = {
  mutipleMongoseToObject: function (mongooses) {
    return mongooses.map((mongoose) => mongoose.toObject());
  },
  mongoseToObject: function (mongooses) {
    return mongooses ? mongooses.toObject() : mongooses;
  },
};

// do khi lấy dữ liệu từ mongoose thì nó trả về 1 object contructor dữ liệu nó nằm trong proto nên
// nên khi lấy ra cần biến đổi về liểu object bt
