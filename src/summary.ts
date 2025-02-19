import axios from "axios";
import takeScreenshot from "./shot";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!; // Remplace par ta clé API OpenRouter

const generateSummary = async (projectDetails: string) => {
  const systemPrompt = `
      1. **Nouvelles fonctionnalités ajoutées** :
         - (Liste des nouvelles fonctionnalités ou modules ajoutés)
  
      2. **Améliorations effectuées** :
         - (Liste des améliorations et optimisations apportées au code ou aux systèmes existants)
  
      3. **Problèmes résolus** :
         - (Mentionner les bugs ou problèmes résolus dans cette mise à jour)
  
      Voici un exemple :
      1. **Nouvelles fonctionnalités ajoutées** :
         - Ajout d'un système de combat amélioré pour VelvetDream.
         - Introduction d'un moteur de quêtes interactif avec des dialogues personnalisés.
  
      2. **Améliorations effectuées** :
         - Optimisation des performances du moteur de rendu.
         - Réduction de la latence des actions en combat.
  
      3. **Problèmes résolus** :
         - Correction d'un bug qui empêchait le joueur de sauvegarder sa progression en combat.`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3.2-11b-vision-instruct:free",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: ` Voici un résumé des avancées de mon projet : ${projectDetails}. Rédige-moi un résumé concis en suivant le modèle suivant :\n ${systemPrompt}.`,
              },
              {
                type: "image_url",
                image_url: {
                  url: await takeScreenshot(),
                },
              },
            ],
          },
        ],
        max_tokens: 200, // On augmente un peu le nombre de tokens pour plus de détails
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const summary = response.data.choices[0].message.content;
    return summary;
  } catch (error) {
    console.error("Erreur lors de la génération du résumé:", error);
  }
};

export default generateSummary;
