const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Ruta de registro
router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Verificar si el usuario existe
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ msg: 'Credenciales inválidas' });
  
      // Verificar la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Credenciales inválidas' });
  
      // Crear token JWT
      const token = jwt.sign({ id: user._id, role: user.role }, 'tu_secreto', {
        expiresIn: '1h',
      });
  
      res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Credenciales inválidas' });

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Credenciales inválidas' });

    // Crear token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, 'tu_secreto', {
      expiresIn: '1h',
    });

    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
