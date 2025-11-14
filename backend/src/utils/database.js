import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "../data");
const usersFile = path.join(dataDir, "users.json");

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize users.json if it doesn't exist
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, JSON.stringify([], null, 2));
}

export const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFile, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const writeUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

export const findUserByEmail = (email) => {
  const users = readUsers();
  return users.find((u) => u.email === email);
};

export const findUserByPhoneNumber = (phoneNumber) => {
  const users = readUsers();
  return users.find((u) => u.phoneNumber === phoneNumber);
};

export const findUserById = (id) => {
  const users = readUsers();
  return users.find((u) => u.id === id);
};

export const addUser = (user) => {
  const users = readUsers();
  users.push(user);
  writeUsers(users);
  return user;
};

export const updateUser = (id, updatedData) => {
  const users = readUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedData };
    writeUsers(users);
    return users[index];
  }
  return null;
};
