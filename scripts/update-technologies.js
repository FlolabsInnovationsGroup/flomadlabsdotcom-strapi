const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;
const IMAGE_DIR = '/Users/elizabethstein/Projects/flomadlabsdotcom/public/images';

const techUpdates = [
  { name: "CAIPO", image: "caipotech.png", link: "/caipo" },
  { name: "MoodChanger for People", image: "transforming.png", link: "/moodchanger-people" },
  { name: "MoodChanger for Pets", image: "forpets.png", link: "/moodchanger-pets" },
  { name: "AI Travel on Earth and Beyond", image: "aitravel.png", link: "/ai-travel" },
  { name: "Animal Vocalization", image: "animalvocalization.png", link: "/animal-vocalization" },
  { name: "AI and Robotics", image: "airoboticspics.jpg", link: "/ai-robotics" }
];

async function uploadImage(imagePath) {
  const formData = new FormData();
  formData.append('files', fs.createReadStream(imagePath));
  
  const response = await axios.post(
    `${STRAPI_URL}/api/upload`,
    formData,
    {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${API_TOKEN}`
      }
    }
  );
  
  return response.data[0].id;
}

async function updateTechnologies() {
  try {
    const response = await axios.get(`${STRAPI_URL}/api/technologies`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` }
    });

    const technologies = response.data.data;

    for (const update of techUpdates) {
      const tech = technologies.find(t => t.name === update.name);
      
      if (tech) {
        const imagePath = path.join(IMAGE_DIR, update.image);
        const imageId = await uploadImage(imagePath);
        
        await axios.put(
          `${STRAPI_URL}/api/technologies/${tech.documentId}`,
          {
            data: {
              image: imageId,
              link: update.link
            }
          },
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              'Content-Type': 'application/json'
            }
          }
        );
        console.log(`✅ Updated: ${update.name}`);
      }
    }

    console.log('\n✨ All technologies updated!');
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

updateTechnologies();
