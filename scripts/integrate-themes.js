import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const songsPath = path.join(__dirname, '../src/constants/songs.json');
const scriptsDir = __dirname;

const songs = JSON.parse(fs.readFileSync(songsPath, 'utf-8'));

// Crear un mapa de themes por ID
const themeMap = new Map();
let themeFilesProcessed = 0;

// Leer todos los archivos themes-*.json en scripts/
const files = fs.readdirSync(scriptsDir);
const themeFiles = files.filter(f => f.startsWith('themes-') && f.endsWith('.json'));

themeFiles.forEach(file => {
  const filePath = path.join(scriptsDir, file);
  const themes = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  themes.forEach(t => {
    themeMap.set(t.id, t.theme);
  });
  themeFilesProcessed++;
});

// Integrar themes en las canciones
let integrated = 0;
songs.forEach(song => {
  if (themeMap.has(song.id)) {
    song.theme = themeMap.get(song.id);
    integrated++;
  }
});

// Guardar songs.json actualizado
fs.writeFileSync(songsPath, JSON.stringify(songs, null, 2));

console.log(`✅ Themes integrados: ${integrated} canciones`);
console.log(`📁 Archivo actualizado: ${songsPath}`);
console.log(`📄 Archivos procesados: ${themeFilesProcessed}`);
