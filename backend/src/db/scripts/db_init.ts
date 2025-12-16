import { sequelize } from "..";

async function initDatabase() {
    try {
        console.log('Initializing database...');
        console.log('WARNING: This will drop all existing data!');

        await sequelize.sync({ alter: true });

        console.log('✅ Database initialized successfully');
        console.log(
            'All tables have been created and existing data has been cleared'
        );
        process.exit(0);
    } catch (error) {
        console.error('❌ Error initializing database:', error);
        process.exit(1);
    }
}

initDatabase();
