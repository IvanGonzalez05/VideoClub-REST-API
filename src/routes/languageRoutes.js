const express = require('express');
const languageController = require('../controllers/languageController');

const router = express.Router();

router
    .route('/')
    .get(languageController.getAllLanguages)
    .post(languageController.createLanguage);

router
    .route('/:id')
    .get(languageController.getOneLanguage)
    .patch(languageController.updateLanguage)
    .delete(languageController.deleteLanguage);

module.exports = router;
