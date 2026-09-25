require('dotenv').config();
const bcrypt = require('bcryptjs');
const { connectDB } = require('./src/config/db');
const { Admin } = require('./src/models');

const USERNAME = process.env.SEED_ADMIN_USER || 'admin';
const PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'cambia_esta_clave';

(async () => {
  try {
    await connectDB();

    const existing = await Admin.findOne({ where: { username: USERNAME } });
    if (existing) {
      console.log(`El usuario "${USERNAME}" ya existe. No se creó ninguno nuevo.`);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(PASSWORD, 10);
    await Admin.create({ username: USERNAME, password: hashedPassword });

    console.log(`Admin creado -> usuario: ${USERNAME} / contraseña: ${PASSWORD}`);
    process.exit(0);
  } catch (error) {
    console.error('Error creando el admin:', error.message);
    process.exit(1);
  }
})();