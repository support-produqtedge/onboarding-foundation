import { DataTypes, Sequelize } from "sequelize";

const VerifyEmailSchema = (sequelize: Sequelize) => {
  const VerifyEmail = sequelize.define<any, any>(
    'VerifyEmail',
    {
      email: {
        type: DataTypes.STRING
      },
      key: {
        type: DataTypes.STRING,
        unique: true
      },
      registerToken: {
        type: DataTypes.STRING
      }
    }, {
      tableName: 'verifyEmail',
      timestamps: true
    }
  );

  return VerifyEmail;
}

export default VerifyEmailSchema;
