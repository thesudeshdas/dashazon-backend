exports.sanitiseList = (arr) =>
  arr.map((item) => {
    return { ...item._doc, id: item._id, _id: undefined, __v: undefined };
  });

exports.sanitiseObject = (obj) => ({
  ...obj._doc,
  id: obj._id,
  _id: undefined,
  __v: undefined,
});
