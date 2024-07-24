"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLevels = exports.removeItems = exports.getItems = exports.updateItems = exports.addItems = exports.getAdminData = void 0;
const getAdminData = (req, res) => {
    // TODO  implement logic to get admin data here if needed
    res.json({ message: 'Admin data retrieved successfully' });
};
exports.getAdminData = getAdminData;
const addItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Assuming req.body contains data for adding items
        const { question, subject, topic, mark, difficulty } = req.body;
        // Create new inventory item
        res.json({ message: 'Item added successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding item', error: error.message });
    }
});
exports.addItems = addItems;
const updateItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemId } = req.params; // Assuming itemId is passed in the URL parameter
        const { itemName, price, description, quantity } = req.body;
        // Find inventory item by itemId
        const item = '';
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        // Update inventory item
        res.json({ message: 'Item updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating item', error: error.message });
    }
});
exports.updateItems = updateItems;
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieve all inventory items
        const items = [];
        res.json({ items });
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving items', error: error.message });
    }
});
exports.getItems = getItems;
const removeItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemId: id } = req.body; // Assuming itemId is passed in the URL parameter
        // Find inventory item by itemId
        const item = [];
        console.log(id, req.params);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        // Delete item
        // await item.destroy();
        res.json({ message: 'Item removed successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error removing item', error: error.message });
    }
});
exports.removeItems = removeItems;
const getLevels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // You can implement logic to get levels here if needed
        res.json({ message: 'Levels retrieved successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving levels', error: error.message });
    }
});
exports.getLevels = getLevels;
