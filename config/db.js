const mongoose = require('mongoose');
require('colors');

module.exports = async (server) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_CLOUD_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    if (conn) {
      console.log(`mongodb connection successful!!`.cyan);
      server.listen(process.env.PORT | 5000, () =>
        console.log(
          `server running on ${process.env.NODE_ENV} mode on port ${process.env
            .PORT | 5000}!!`.black.bgWhite
        )
      );
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
