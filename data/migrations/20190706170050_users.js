
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments();
      tbl.datetime('created_at')
      tbl.string('email', 128).notNullable().unique()
      tbl.string('password',128);
      tbl.string('fullName',128);
      tbl.string('profilePic');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
