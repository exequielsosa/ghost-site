#!/usr/bin/env node

/**
 * Script de testing para las funciones de IA después de migrar a gpt-oss-120b
 * Prueba: filtro de relevancia + procesamiento de noticia
 * NO escribe nada en la DB
 */

import "dotenv/config.js";
import { isRelevantToGhost, processNewsWithAI } from "../src/lib/ai.ts";

const testCases = {
  // ✅ Noticia relevante: menciona Ghost directamente
  relevant: {
    title: "Ghost anuncia nueva gira 2026 por Latinoamérica",
    content:
      "La banda sueca Ghost, liderada por Tobias Forge, ha anunciado una serie de conciertos en Latinoamérica durante 2026. La gira incluirá paradas en Argentina, Brasil y México. Este será el segundo viaje importante de Ghost por la región después del éxito de su última gira. Los boletos saldrán a la venta el próximo mes.",
  },

  // ❌ Noticia no relevante: menciona "ghost" pero en otro contexto
  notRelevant: {
    title: "Nuevo juego de horror 'Ghost Manor' llegará a Steam",
    content:
      "El equipo de desarrollo indie ha lanzado el tráiler del nuevo juego de horror psicológico 'Ghost Manor'. El juego presenta mecánicas de sigilo y sigue la historia de un detective investigando eventos paranormales. La crítica especializada lo compara con juegos clásicos del género. Se espera que llegue a plataformas como Steam, PlayStation y Xbox este año.",
  },

  // ✅ Noticia relevante: sobre Tobias Forge
  tobias: {
    title: "Tobias Forge comparte detalles de nuevo álbum en podcast",
    content:
      "En una entrevista exclusiva con un podcast de rock, Tobias Forge, el mastermind detrás de Ghost, reveló avances del próximo álbum de estudio. 'Será diferente a todo lo que hemos hecho', comentó Forge. El álbum está programado para lanzarse en 2027 y contará con colaboraciones con artistas internacionales.",
  },
};

async function testRelevanceFilter() {
  console.log("🧪 TEST 1: FILTRO DE RELEVANCIA\n");

  for (const [name, testCase] of Object.entries(testCases)) {
    try {
      console.log(`  Testando: ${name}`);
      console.log(`  Título: "${testCase.title}"`);

      const isRelevant = await isRelevantToGhost(
        testCase.title,
        testCase.content
      );

      const icon = isRelevant ? "✅" : "❌";
      console.log(`  Resultado: ${icon} ${isRelevant ? "RELEVANTE" : "NO RELEVANTE"}\n`);
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}\n`);
    }
  }
}

async function testNewsProcessing() {
  console.log("\n🧪 TEST 2: PROCESAMIENTO DE NOTICIA (solo relevant)\n");

  const testNews = testCases.relevant;

  try {
    console.log(`  Procesando: "${testNews.title}"`);
    console.log("  Esperando respuesta de Groq (esto puede tomar ~10-15s)...\n");

    const result = await processNewsWithAI(
      testNews.title,
      testNews.content,
      "https://example.com/noticia"
    );

    console.log("  ✅ PROCESAMIENTO EXITOSO\n");
    console.log("  📄 Resultados:");
    console.log(`     EN: "${result.title_en}"`);
    console.log(`     ES: "${result.title_es}"\n`);

    console.log("  📝 Descripciones (primeras 150 chars):");
    console.log(
      `     EN: "${result.description_en.substring(0, 150)}..."`
    );
    console.log(
      `     ES: "${result.description_es.substring(0, 150)}..."\n`
    );

    console.log("  🖼️  Captions:");
    console.log(`     EN: "${result.image_caption_en}"`);
    console.log(`     ES: "${result.image_caption_es}"`);
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
  }
}

async function main() {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("  TEST SUITE: Migración Groq llama-3.3 → gpt-oss-120b");
  console.log("═══════════════════════════════════════════════════════════\n");

  await testRelevanceFilter();
  await testNewsProcessing();

  console.log("\n═══════════════════════════════════════════════════════════");
  console.log("  ✅ Tests completados (sin escribir en DB)");
  console.log("═══════════════════════════════════════════════════════════\n");
}

main().catch(console.error);
