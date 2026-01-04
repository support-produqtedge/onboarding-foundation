import { DataTypes, Sequelize } from "sequelize";

const CompanySchema = (sequelize: Sequelize) => {
  const Company = sequelize.define<any, any>(
    'Company',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        allowNull: false
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      company_owner: {
        type: DataTypes.UUID
      },
      cacRegNo: {
        type: DataTypes.STRING
      },
      tin: {
        type: DataTypes.STRING
      },
      document: {
        type: DataTypes.STRING
      }
    }, {
      tableName: 'companies',
      timestamps: true,
    }
  );

  return Company;
};

export default CompanySchema;
