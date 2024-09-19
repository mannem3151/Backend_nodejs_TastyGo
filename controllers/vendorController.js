const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotEnv = require("dotenv");
dotEnv.config();
const secretKey = process.env.WhatIsYourName;

const VendorRegister = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Request Body:", req.body);

  // Check if password is provided
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  try {
    // Check if email already exists
    const vendorEmail = await Vendor.findOne({ email });
    if (vendorEmail) {
      return res.status(400).json({ error: "Email already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new vendor
    const newVendor = new Vendor({
      username,
      email,
      password: hashedPassword,
    });
    await newVendor.save();

    // Send success response
    res.status(201).json({ message: "Vendor registered successfully" });
    console.log("Vendor registered successfully");
  } catch (error) {
    console.error("Error in VendorRegister:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const vendorLogin = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Find vendor by email
    const vendor = await Vendor.findOne({ email });
    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ vendorId: vendor._id }, secretKey, {
      expiresIn: "1h",
    });

    // Send success response
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error in vendorLogin:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("firm");

    res.json({ vendors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getVendorById = async (req, res) => {
  const vendorId = req.params.id;
  console.log(vendorId);

  try {
    const vendor = await Vendor.findById(vendorId).populate("firm");

    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    res.status(200).json({ vendor });
  } catch (error) {
    console.error("Error in vendorLogin:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { VendorRegister, vendorLogin, getAllVendors, getVendorById };
