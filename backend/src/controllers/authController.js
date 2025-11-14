import {
  hashPassword,
  comparePasswords,
  generateToken,
  generate2FACode,
} from "../utils/auth.js";
import {
  findUserByEmail,
  findUserByPhoneNumber,
  addUser,
  updateUser,
  findUserById,
  readUsers,
} from "../utils/database.js";
import {
  send2FACodeEmail,
  send2FACodeSMS,
} from "../utils/mailer.js";
import crypto from "crypto";

export const register = async (req, res) => {
  try {
    const { email, phoneNumber, password, birthDate } = req.body;

    // Validate input
    if (!email || !phoneNumber || !password || !birthDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    if (findUserByEmail(email)) {
      return res.status(400).json({ error: "Email already registered" });
    }

    if (findUserByPhoneNumber(phoneNumber)) {
      return res.status(400).json({ error: "Phone number already registered" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = {
      id: crypto.randomUUID(),
      email,
      phoneNumber,
      birthDate,
      password: hashedPassword,
      twoFactorEnabled: true,
      twoFactorCode: null,
      twoFactorCodeExpires: null,
      twoFactorMethod: null,
      createdAt: new Date().toISOString(),
    };

    // Add user to database
    addUser(user);

    // Generate 2FA code
    const code = generate2FACode();
    updateUser(user.id, {
      twoFactorCode: code,
      twoFactorCodeExpires: new Date(Date.now() + 10 * 60000), // 10 minutes
    });

    // Randomly choose between email or SMS
    const method = Math.random() > 0.5 ? "email" : "sms";
    updateUser(user.id, { twoFactorMethod: method });

    // Send 2FA code
    if (method === "email") {
      await send2FACodeEmail(email, code);
    } else {
      await send2FACodeSMS(phoneNumber, code);
    }

    console.log(`[DEV] 2FA Code for ${email}: ${code}`);

    res.status(201).json({
      message: "User registered successfully",
      userId: user.id,
      twoFactorMethod: method,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res
        .status(400)
        .json({ error: "Email/Phone and password are required" });
    }

    // Find user
    const user =
      findUserByEmail(emailOrPhone) ||
      findUserByPhoneNumber(emailOrPhone);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Compare passwords
    const isPasswordCorrect = await comparePasswords(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // If 2FA is enabled, send code
    if (user.twoFactorEnabled) {
      const code = generate2FACode();
      updateUser(user.id, {
        twoFactorCode: code,
        twoFactorCodeExpires: new Date(Date.now() + 10 * 60000),
      });

      const method = Math.random() > 0.5 ? "email" : "sms";
      updateUser(user.id, { twoFactorMethod: method });

      if (method === "email") {
        await send2FACodeEmail(user.email, code);
      } else {
        await send2FACodeSMS(user.phoneNumber, code);
      }

      console.log(`[DEV] 2FA Code for ${user.email}: ${code}`);

      res.status(200).json({
        message: "2FA code sent",
        userId: user.id,
        twoFactorMethod: method,
      });
    } else {
      // If 2FA is disabled, generate token
      const token = generateToken(user.id);
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
          birthDate: user.birthDate,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verify2FA = async (req, res) => {
  try {
    const { userId, code } = req.body;

    if (!userId || !code) {
      return res.status(400).json({ error: "User ID and code are required" });
    }

    const user = findUserById(userId);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Check if code is expired
    if (new Date() > new Date(user.twoFactorCodeExpires)) {
      return res.status(400).json({ error: "2FA code has expired" });
    }

    // Check if code is correct
    if (user.twoFactorCode !== code) {
      return res.status(400).json({ error: "Invalid 2FA code" });
    }

    // Clear 2FA code
    updateUser(userId, {
      twoFactorCode: null,
      twoFactorCodeExpires: null,
    });

    // Generate token
    const token = generateToken(userId);

    res.status(200).json({
      message: "2FA verification successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        birthDate: user.birthDate,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = findUserById(req.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        birthDate: user.birthDate,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
