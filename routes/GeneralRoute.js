const express = require("express");
const router = express.Router();
const {
  getConfig,
  createOrUpdateConfig,
  getConfigForArduino,
  updateConfigByElemento
} = require("../controllers/configController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Config:
 *       type: object
 *       properties:
 *         elemento:
 *           type: string
 *           description: Nombre del dispositivo (led, servo, etc.)
 *         estado:
 *           type: number
 *           description: Estado del dispositivo (0 = apagado, 1 = encendido)
 *         valor:
 *           type: number
 *           description: Valor del dispositivo (ejemplo, ángulo del servo)
 *         unidadMedida:
 *           type: string
 *           description: Unidad de medida (ejemplo, "grados", "cm")
 *       example:
 *         elemento: "servo"
 *         estado: 1
 *         valor: 90
 *         unidadMedida: "grados"
 */

/**
 * @swagger
 * /config:
 *   get:
 *     summary: Obtener todas las configuraciones
 *     tags: [Configuración]
 *     responses:
 *       200:
 *         description: Lista de configuraciones
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: number
 */
router.get("/config", getConfig);

/**
 * @swagger
 * /config:
 *   post:
 *     summary: Crear o actualizar una configuración
 *     tags: [Configuración]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Config'
 *     responses:
 *       201:
 *         description: Configuración guardada o actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Config'
 */
router.post("/config", createOrUpdateConfig);

/**
 * @swagger
 * /config/arduino:
 *   get:
 *     summary: Obtener la configuración en formato para Arduino
 *     tags: [Configuración]
 *     responses:
 *       200:
 *         description: Datos formateados para Arduino
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: object
 *                 properties:
 *                   estado:
 *                     type: number
 *                   valor:
 *                     type: number
 */
router.get("/config/arduino", getConfigForArduino);

/**
 * @swagger
 * /config/{elemento}:
 *   put:
 *     summary: Actualizar una configuración por nombre del elemento
 *     tags: [Configuración]
 *     parameters:
 *       - in: path
 *         name: elemento
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del dispositivo a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: number
 *                 description: Nuevo estado del dispositivo
 *               valor:
 *                 type: number
 *                 description: Nuevo valor del dispositivo
 *     responses:
 *       200:
 *         description: Configuración actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Config'
 *       404:
 *         description: Configuración no encontrada
 */
router.put("/config/:elemento", updateConfigByElemento);

module.exports = router;