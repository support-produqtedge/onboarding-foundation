import { DataTypes, Sequelize } from "sequelize";

const AuditLogsSchema = (sequelize: Sequelize) => {
  const AuditLogs = sequelize.define<any, any>(
    'AuditLogs',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING
      },
      action: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      }
    }, {
      tableName: 'auditLogs',
      timestamps: true
    }
  );

  return AuditLogs;
}

export default AuditLogsSchema;
