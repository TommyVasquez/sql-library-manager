const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Library extends Sequelize.Model {}
    Library.init(
        {
            title: Sequelize.STRING,
        },
        { sequelize }
    );

    return Movie;
};
