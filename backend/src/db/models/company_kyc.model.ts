import { DataTypes, Sequelize } from "sequelize";

const CompanyKYCSchema = (sequelize: Sequelize) => {
  const CompanyKYC = sequelize.define<any, any>(
    'CompanyKYC',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        allowNull: false
      },
      companyID: {
        type: DataTypes.UUID
      },
      cacRegNo: {
        type: DataTypes.STRING
      },
      nin: {
        type: DataTypes.STRING
      },
      document: {
        type: DataTypes.STRING
      }
    }, {
      tableName: 'companyKYCs',
      timestamps: true,
    }
  );

  return CompanyKYC;
};

export default CompanyKYCSchema;
