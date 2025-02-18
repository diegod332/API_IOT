const express = require("express");
const { 
  getNextAppointment,
  markNotified,
  createAppointment,
  getAppointmentStatus,
  updateAppointmentStatus
} = require("../controllers/appointmentController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Citas
 *   description: Operaciones relacionadas con la gestión de citas.
 */

/**
 * @swagger
 * /next-appointment:
 *   get:
 *     summary: Obtiene la siguiente cita pendiente.
 *     tags: [Citas]
 *     responses:
 *       200:
 *         description: La siguiente cita obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: No hay citas pendientes.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/next-appointment", getNextAppointment);

/**
 * @swagger
 * /mark-notified/{id}:
 *   post:
 *     summary: Marca una cita como notificada.
 *     tags: [Citas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la cita.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cita marcada como notificada correctamente.
 *       400:
 *         description: ID inválido.
 *       404:
 *         description: Cita no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/mark-notified/:id", markNotified);

/**
 * @swagger
 * /create-appointment:
 *   post:
 *     summary: Crea una nueva cita.
 *     tags: [Citas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               appointment_date:
 *                 type: string
 *                 format: date
 *               appointment_time:
 *                 type: string
 *             required:
 *               - first_name
 *               - last_name
 *               - appointment_date
 *               - appointment_time
 *     responses:
 *       201:
 *         description: Cita creada exitosamente.
 *       400:
 *         description: Campos requeridos faltantes.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/create-appointment", createAppointment);

/**
 * @swagger
 * /appointment-status/{id}:
 *   get:
 *     summary: Obtiene el estado de una cita.
 *     tags: [Citas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la cita.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estado de la cita obtenido correctamente.
 *       400:
 *         description: ID inválido.
 *       404:
 *         description: Cita no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/appointment-status/:id", getAppointmentStatus);

/**
 * @swagger
 * /update-appointment-status/{id}:
 *   post:
 *     summary: Actualiza el estado de notificación de una cita.
 *     tags: [Citas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la cita.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notified:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Estado de la cita actualizado correctamente.
 *       400:
 *         description: Datos inválidos.
 *       404:
 *         description: Cita no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/update-appointment-status/:id", updateAppointmentStatus);

module.exports = router;
