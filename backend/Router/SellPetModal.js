// routes/petRoutes.js
const express = require('express');
const router = express.Router();

const { 
  createPet, 
  getPets, 
  getPet, 
  updatePet, 
  deletePet 
} = require('../Controller/PetControler');



// @route   POST /api/pets
// @desc    Create a new pet listing
// @access  Public
router.post('/save', createPet);

// @route   GET /api/pets
// @desc    Get all pet listings
// @access  Public
router.get('/All', getPet);

// @route   GET /api/pets/:id
// @desc    Get single pet listing
// // @access  Public
// router.get('/:id', getPet);

// @route   PUT /api/pets/:id
// @desc    Update pet listing
// @access  Private
router.put('/status/:id', updatePet);

// @route   DELETE /api/pets/:id
// @desc    Delete pet listing
// @access  Private
// router.delete('/:id', deletePet);

module.exports = router;